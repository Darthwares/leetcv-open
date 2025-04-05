export const fetchStub = (_:any) => {
  return Promise.resolve([{ data: "fetchStub" }]);
};

export const manualOpts = {
  refetchOnWindowFocus: false,
  enabled: false
}


