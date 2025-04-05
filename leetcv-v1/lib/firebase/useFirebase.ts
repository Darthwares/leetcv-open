import { Analytics, getAnalytics } from "firebase/analytics";
import { FirebasePerformance, getPerformance } from "firebase/performance";

import * as React from "react";
import app from "./initializeFirebase";

export interface FirebaseState {
  analytics: Analytics | null;
  performance: FirebasePerformance | null;
}

export function useFirebase(): FirebaseState {
  const [analytics, setAnalytics] = React.useState<Analytics | null>(null);
  const [performance, setPerformance] = React.useState<FirebasePerformance | null>(null);
  
  React.useEffect(() => {
    if (app) {
      setAnalytics(getAnalytics(app));
      setPerformance(getPerformance(app));
    }
  }, []);

  return {
    analytics,
    performance
  };
}
