import { createSelector, createSlice } from "@reduxjs/toolkit";

const modalInitialState = {
  isCreateFolderModalOpen: false,
  isUploadFileModalOpen: false,
  isUploadFolderModalOpen: false,
  isRenameItemModalOpen: false,
  isShareModalOpen: false,
  isFileModalOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState: modalInitialState,
  reducers: {
    setCreateFolderModalOpen: (state, action) => {
      return { ...state, isCreateFolderModalOpen: action.payload };
    },
    setUploadFileModalOpen: (state, action) => {
      return { ...state, isUploadFileModalOpen: action.payload };
    },
    setUploadFolderModalOpen: (state, action) => {
      return { ...state, isUploadFolderModalOpen: action.payload };
    },
    setShareModalOpen: (state, action) => {
      return { ...state, isShareModalOpen: action.payload };
    },
    setRenameItemModalOpen: (state, action) => {
      return { ...state, isRenameItemModalOpen: action.payload };
    },
    setFileModalOpen: (state, action) => {
      return { ...state, isFileModalOpen: action.payload };
    },
  },
});

export const {
  setCreateFolderModalOpen,
  setUploadFileModalOpen,
  setUploadFolderModalOpen,
  setRenameItemModalOpen,
  setShareModalOpen,
  setFileModalOpen,
} = modalSlice.actions;

export const selectCreateFolderModalOpen = createSelector(
  (state) => state.modal,
  (modal) => modal.isCreateFolderModalOpen
);
export const selectUploadFileModalOpen = createSelector(
  (state) => state.modal,
  (modal) => modal.isUploadFileModalOpen
);
export const selectUploadFolderModalOpen = createSelector(
  (state) => state.modal,
  (modal) => modal.isUploadFolderModalOpen
);
export const selectShareModalOpen = createSelector(
  (state) => state.modal,
  (modal) => modal.isShareModalOpen
);
export const selectRenameItemModalOpen = createSelector(
  (state) => state.modal,
  (modal) => modal.isRenameItemModalOpen
);
export const selectFileModalOpen = createSelector(
  (state) => state.modal,
  (modal) => modal.isFileModalOpen
);
export default modalSlice.reducer;
