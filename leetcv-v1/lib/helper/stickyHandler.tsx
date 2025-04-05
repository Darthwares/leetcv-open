export function stickyHandler(
  headerRef: React.RefObject<HTMLDivElement>,
  setIsHeaderSticky: React.Dispatch<React.SetStateAction<boolean>>
) {
  return () => {
    if (headerRef.current) {
      const { top } = headerRef.current.getBoundingClientRect();
      setIsHeaderSticky(top <= 0);
    }
  };
}
