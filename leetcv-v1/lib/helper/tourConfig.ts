import {
  LOCAL_STORAGE_DASHBOARD,
  LOCAL_STORAGE_EDITOR,
  LOCAL_STORAGE_FORMFAB,
  LOCAL_STORAGE_PROSPECTS,
  LOCAL_STORAGE_REQUESTS,
  LOCAL_STORAGE_REVIEW,
  LOCAL_STORAGE_USERS,
} from "@constants/defaults";

export function defaultDashboardTour() {
  const getLeetcvTour = localStorage.getItem(LOCAL_STORAGE_DASHBOARD);
  if (getLeetcvTour === null) {
    localStorage.setItem(LOCAL_STORAGE_DASHBOARD, "false");
  }
}

export function defaultEditorTour() {
  const getLeetcvTour = localStorage.getItem(LOCAL_STORAGE_EDITOR);
  if (getLeetcvTour === null) {
    localStorage.setItem(LOCAL_STORAGE_EDITOR, "false");
  }
}

export function defaultFormFabTour() {
  const getLeetcvTour = localStorage.getItem(LOCAL_STORAGE_FORMFAB);
  if (getLeetcvTour === null) {
    localStorage.setItem(LOCAL_STORAGE_FORMFAB, "false");
  }
}

export function defaultProspectsTour() {
  const getLeetcvTour = localStorage.getItem(LOCAL_STORAGE_PROSPECTS);
  if (getLeetcvTour === null) {
    localStorage.setItem(LOCAL_STORAGE_PROSPECTS, "false");
  }
}

export function defaultRequestsTour() {
  const getLeetcvTour = localStorage.getItem(LOCAL_STORAGE_REQUESTS);
  if (getLeetcvTour === null) {
    localStorage.setItem(LOCAL_STORAGE_REQUESTS, "false");
  }
}

export function defaultReviewTour() {
  const getLeetcvTour = localStorage.getItem(LOCAL_STORAGE_REVIEW);
  if (getLeetcvTour === null) {
    localStorage.setItem(LOCAL_STORAGE_REVIEW, "false");
  }
}

export function defaultUsersTour() {
  const getLeetcvTour = localStorage.getItem(LOCAL_STORAGE_USERS);
  if (getLeetcvTour === null) {
    localStorage.setItem(LOCAL_STORAGE_USERS, "false");
  }
}

export function getTourConfig() {
  const dashboard = localStorage.getItem(LOCAL_STORAGE_DASHBOARD);
  const editor = localStorage.getItem(LOCAL_STORAGE_EDITOR);
  const prospectsTour = localStorage.getItem(LOCAL_STORAGE_PROSPECTS);
  const requestsTour = localStorage.getItem(LOCAL_STORAGE_REQUESTS);
  const reviewTour = localStorage.getItem(LOCAL_STORAGE_REVIEW);
  const userTour = localStorage.getItem(LOCAL_STORAGE_USERS);
  const formFab = localStorage.getItem(LOCAL_STORAGE_FORMFAB);

  const getTourStatus = (endTour: string) => {
    switch ("false") {
      case dashboard:
        return localStorage.setItem(LOCAL_STORAGE_DASHBOARD, endTour);
      case editor:
        return localStorage.setItem(LOCAL_STORAGE_EDITOR, endTour);
      case formFab:
        return localStorage.setItem(LOCAL_STORAGE_FORMFAB, endTour);
      case requestsTour:
        return localStorage.setItem(LOCAL_STORAGE_REQUESTS, endTour);
      case prospectsTour:
        return localStorage.setItem(LOCAL_STORAGE_PROSPECTS, endTour);
      case reviewTour:
        return localStorage.setItem(LOCAL_STORAGE_REVIEW, endTour);
      case userTour:
        return localStorage.setItem(LOCAL_STORAGE_USERS, endTour);
    }
  };

  return {
    dashboard,
    editor,
    prospectsTour,
    requestsTour,
    reviewTour,
    userTour,
    formFab,
    getTourStatus,
  };
}
