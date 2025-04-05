import { NextIntlProvider } from 'next-intl';
import { MutableSnapshot, RecoilRoot } from 'recoil';
import messages from '../../messages/en-US.json';

import React, { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Resume } from 'data/models/UserInfo';
import { profileResumeState, resumeState } from '@state/state';

const defaultResume: Resume = {
  id: "testid",
  displayName: "test-displayName",
  description: "",
  email: "test@example.com",
  phoneNumber: "",
  handle: "test-handle",
  position: "",
  currentCompany: "",
  yoe: "",
  skills: [],
  socialMedia: [],
  preferences: [],
  languages:[],
  projects: [],
  educations: [],
  experiences: [],
  awards: [
    {
      id: "0",
      name: "xyz",
      description: "Gold Medal",
      awardFor: "Delhi university",
      date: "Jan 2021",
    },
  ],
  workType: "",
  city: "",
  state: "",
  country: "",
  remoteWork: "Office",
  private: true,
  version: "1.0",
};

const setupTestState =
  (resume: Resume | undefined) => (snap: MutableSnapshot) => {
    snap.set(resumeState, resume ? resume : defaultResume);
    snap.set(profileResumeState, resume ? resume : defaultResume);
  };

const AllTheProviders =
  (resume?: Resume): FC =>
  // eslint-disable-next-line react/display-name
  ({ children }: any) => {
    return (<NextIntlProvider messages={messages} locale="en-US">
    <RecoilRoot initializeState={setupTestState(resume)}>
      {children}
    </RecoilRoot>
  </NextIntlProvider>);
  };

const customRender = (
  ui: ReactElement,
  resume?: Resume,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders(resume), ...options });

export * from '@testing-library/react';
export { customRender as render };
