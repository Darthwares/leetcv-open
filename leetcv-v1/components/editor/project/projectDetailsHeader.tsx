import { useRecoilState, useSetRecoilState } from "recoil";
import { useTranslations } from "next-intl";
import { useRef, useState, useMemo } from "react";
import { useDetectSticky } from "@lib/helper/detectSticky";
import {
  openLastProjectState,
  openProjectAttestSidebarState,
  resumeState,
} from "@state/state";
import { getDefaultProject, tipsProject } from "@constants/defaults";
import HeaderContainer from "@components/headerContainer";

function ProjectDetailsHeader() {
  const [userInfo, setUserInfo] = useRecoilState(resumeState);
  const setOpenLastProject = useSetRecoilState(openLastProjectState);
  const headerRef = useRef<HTMLDivElement>(null);
  const [isProjectHeaderSticky, setIsProjectHeaderSticky] = useState(false);
  useDetectSticky(headerRef, setIsProjectHeaderSticky);
  const setOpenProjectAttestModel = useSetRecoilState(
    openProjectAttestSidebarState
  );

  const translations = useTranslations("Dashboard");
  const t = useMemo(() => translations, []);

  const [projectTipButton, setProjectTipButton] = useState(false);

  const defaultProject = useMemo(
    () => getDefaultProject((userInfo?.projects?.length ?? 0) + 1),
    [userInfo?.projects]
  );

  const handleAdd = () => {
    if (userInfo) {
      setUserInfo({
        ...userInfo,
        projects: [...(userInfo?.projects ?? []), defaultProject],
      });
    }

    setOpenProjectAttestModel((prevOpenState) => ({
      ...prevOpenState,
      [defaultProject.id]: false,
    }));

    setOpenLastProject(true);
  };

  return (
    <div
      className="headerDetails projectHeader"
      data-testid="projectDetailsHeader"
    >
      <HeaderContainer
        headerRef={headerRef}
        isHeaderSticky={isProjectHeaderSticky}
        handleAdd={handleAdd}
        tipButton={projectTipButton}
        setTipButton={setProjectTipButton}
        tipsData={tipsProject}
        title={t("add-project")}
        heading={t("project-details")}
      />
    </div>
  );
}

export default ProjectDetailsHeader;
