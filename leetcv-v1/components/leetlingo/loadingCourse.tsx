import React from 'react'

interface LoadingCourseProps {
  loadingText?: string;
}

const LoadingCourse = ({ loadingText }: LoadingCourseProps) => {
  return (
        <div className="flex flex-col space-y-4 items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-indigo-500" />
        {loadingText && <p className="ml-4 text-lg text-gray-600">{loadingText}</p>}
      </div>
  );
}

export default LoadingCourse;
