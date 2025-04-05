import { trpc } from "@utils/trpc";
import { useRecoilState, useSetRecoilState } from "recoil";
import { projectState, showAttestedList, userIdState } from "@state/state";
import { XIcon } from "@heroicons/react/outline";
import { AVATAR_IMAGE, defaultImage } from "@constants/defaults";
import MomentTimeFormate from "@components/momentTimeFormate";

export default function AttestedUserList() {
  const setAttestList = useSetRecoilState(showAttestedList);
  const [project] = useRecoilState(projectState);
  const [userId] = useRecoilState(userIdState);

  const { data: attestedUserList } = trpc.useQuery([
    "fs.attestation.getAttestedUserList",
    { id: userId },
  ]);

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="fixed inset-0 w-full h-full bg-gray-300">
          <div className="flex items-center min-h-screen px-4 py-8">
            <div className="relative overflow-auto max-h-96 w-full max-w-lg px-4 mx-auto bg-white rounded-md shadow-lg">
              <div className="sticky top-0 bg-white py-4 pb-0 z-20">
                <button
                  className="float-right text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-700 rounded-lg text-sm p-1 ml-auto inline-flex items-center border border-gray-200"
                  onClick={() => setAttestList(false)}
                >
                  <span className="">
                    <XIcon className="w-5" />
                  </span>
                </button>
                <p className="capitalize font-semibold">{project?.name}</p>
                <div className="border-b border-gray-200 py-2"></div>
              </div>
              <ul role="list" className="divide-y divide-gray-200 my-2">
                {attestedUserList?.map((user) => {
                  return (
                    <div key={user.email}>
                      {user.status === "Approved" &&
                        user.project.name === project.name && (
                          <li className="flex gap-x-4 py-5">
                            <a
                              href={`${window.location.origin}/r/${user.approvalHandle}`}
                            >
                              <img
                                className="h-12 sm:h-14 w-12 sm:w-14 flex-none rounded-full cursor-pointer bg-gray-50"
                                src={
                                  user.requesterImage
                                    ? user.requesterImage
                                    : defaultImage(user?.userId)
                                }
                                alt="project attestation"
                              />
                            </a>
                            <div className="flex-auto">
                              <div className="flex md:flex-row flex-col items-baseline justify-between gap-x-4">
                                <a
                                  href={`${window.location.origin}/r/${user.approvalHandle}`}
                                  className="text-sm w-52 md:w-60 truncate overflow-hidden font-semibold leading-6 cursor-pointer text-gray-900"
                                >
                                  {user.requesterName}
                                </a>
                                {user.status === "Approved" && (
                                  <div className="text-gray-500 hidden md:block">
                                    <MomentTimeFormate
                                      timeStamp={user.attestedAt}
                                    />
                                  </div>
                                )}
                              </div>
                              <p className="w-52 truncate md:w-60 text-ellipsis overflow-hidden text-sm leading-6 text-gray-600">
                                {user.email}
                              </p>
                              {user.status === "Approved" && (
                                <div className="text-gray-500 block md:hidden">
                                  <MomentTimeFormate
                                    timeStamp={user.attestedAt}
                                  />
                                </div>
                              )}
                            </div>
                          </li>
                        )}
                    </div>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
