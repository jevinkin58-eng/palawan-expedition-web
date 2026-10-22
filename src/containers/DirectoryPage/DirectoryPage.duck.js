import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createImageVariantConfig } from '../../util/sdkLoader';
import { storableError } from '../../util/errors';
import { addMarketplaceEntities } from '../../ducks/marketplaceData.duck';

const RESULT_PAGE_SIZE = 24;

// ================ Async Thunks ================ //

const queryDirectoryListingsPayloadCreator = ({ queryParams, config }, thunkAPI) => {
  const { dispatch, rejectWithValue, extra: sdk } = thunkAPI;

  const {
    aspectWidth = 1,
    aspectHeight = 1,
    variantPrefix = 'listing-card',
  } = config?.layout?.listingImage || {};
  const aspectRatio = aspectHeight / aspectWidth;

  const params = {
    ...queryParams,
    per_page: RESULT_PAGE_SIZE,
    include: ['author', 'images'],
    'fields.image': [`variants.${variantPrefix}`, `variants.${variantPrefix}-2x`],
    ...createImageVariantConfig(`${variantPrefix}`, 400, aspectRatio),
    ...createImageVariantConfig(`${variantPrefix}-2x`, 800, aspectRatio),
  };

  return sdk.listings
    .query(params)
    .then(response => {
      const listings = response.data.data;
      const listingRefs = listings
        .filter(l => !l.attributes.deleted && l.attributes.state === 'published')
        .map(l => ({ id: l.id, type: l.type }));
      dispatch(addMarketplaceEntities(response));
      return {
        listingRefs,
        totalItems: response.data.meta.totalItems,
        totalPages: response.data.meta.totalPages,
        page: response.data.meta.page,
      };
    })
    .catch(e => rejectWithValue(storableError(e)));
};

export const queryDirectoryListings = createAsyncThunk(
  'DirectoryPage/queryDirectoryListings',
  queryDirectoryListingsPayloadCreator
);

// ================ Slice ================ //

const directoryPageSlice = createSlice({
  name: 'DirectoryPage',
  initialState: {
    listingRefs: [],
    queryInProgress: false,
    queryError: null,
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(queryDirectoryListings.pending, state => {
        state.queryInProgress = true;
        state.queryError = null;
      })
      .addCase(queryDirectoryListings.fulfilled, (state, action) => {
        state.queryInProgress = false;
        state.listingRefs = action.payload.listingRefs;
        state.totalItems = action.payload.totalItems;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.page;
      })
      .addCase(queryDirectoryListings.rejected, (state, action) => {
        state.queryInProgress = false;
        state.queryError = action.payload;
      });
  },
});

export default directoryPageSlice.reducer;
