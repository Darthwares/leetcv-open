import { PencilIcon } from "@heroicons/react/outline";
import React, { useState, useEffect } from "react";
import { v4 as guid } from "uuid";
import { Button } from "shadcn/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "shadcn/components/ui/card";
import { Input } from "shadcn/components/ui/input";
import { TrashIcon } from "@heroicons/react/solid";
import DeleteModal from "@components/deleteModal";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  leetFormVisibleState,
  leetLinksListState,
  sideBarOpenState,
  userIdState,
} from "@state/state";
import {
  isUrlValid,
  LeetLink,
  leetLinkInitialValue,
} from "@constants/defaults";
import { Switch } from "@headlessui/react";
import { classNames } from "@utils/classNames";
import SocialMediaWithToggle from "@components/leetLink/socialMediaWithToggle";
import BioAndHeader from "@components/leetLink/bioAndHeader";
import { useTranslations } from "next-intl";
import { trpc } from "@utils/trpc";
import { CustomLinkState } from "data/models/LeetLink";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

export default function LinkForm() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState(leetLinkInitialValue);
  const setLeetFormVisible = useSetRecoilState(leetFormVisibleState);
  const setLeetLinks = useSetRecoilState(leetLinksListState);
  const [isSideBarClosed] = useRecoilState(sideBarOpenState);
  const t = useTranslations("LeetLink");
  const [userId] = useRecoilState(userIdState);
  const { status } = useSession();

  const defaultLinks: CustomLinkState[] = [
    {
      id: guid(),
      urlTitle: "Custom Link 1",
      url: "",
      isOpen: false,
      isEditingTitle: false,
      isValidUrl: true,
      show: true,
    },
  ];

  const [links, setLinks] = useState<CustomLinkState[]>(defaultLinks);

  const setCustomLinks = trpc.useMutation(["fs.leetLink.updateCustomLinks"]);
  const deleteCustomLinks = trpc.useMutation(["fs.leetLink.deleteCustomLink"]);
  const { data: linksData, refetch } = trpc.useQuery(
    ["fs.leetLink.getLeetLink", { id: userId }],
    {
      enabled: status === "authenticated" && !!userId,
    }
  );

  useEffect(() => {
    if (linksData?.customLinks && linksData?.customLinks?.length > 0) {
      setLinks(linksData.customLinks);
    } else {
      setLinks(defaultLinks);
    }
  }, [linksData]);

  useEffect(() => {
    const customLinks = links?.filter(
      (link) =>
        link.isValidUrl && link.url.trim() !== "" && link.urlTitle.trim() !== ""
    );
    const timeOut = setTimeout(() => {
      setCustomLinks.mutate(
        {
          id: userId,
          customLinks: customLinks,
        },
        {
          onSuccess: () => {
            refetch();
          },
        }
      );
    }, 3000);

    return () => {
      clearTimeout(timeOut);
    };
  }, [links]);

  const mapCardsToLeetLinks = (cards: CustomLinkState[]): LeetLink[] => {
    return cards?.map(({ id, urlTitle, url, isValidUrl, show }) => ({
      id,
      urlTitle,
      url,
      isValidUrl,
      show,
    }));
  };

  useEffect(() => {
    const leetLinks = mapCardsToLeetLinks(links);
    setLeetLinks(leetLinks);
  }, [links]);

  const addCard = () => {
    const newCardNumber = links?.length + 1;
    setLinks([
      ...links,
      {
        id: guid(),
        urlTitle: `Custom Link ${newCardNumber}`,
        url: "",
        isOpen: false,
        isEditingTitle: false,
        isValidUrl: true,
        show: true,
      },
    ]);
  };

  const handleInputChange = (
    id: string,
    field: keyof CustomLinkState,
    value: string
  ) => {
    setLinks(
      links.map((card) => (card.id === id ? { ...card, [field]: value } : card))
    );
  };

  const toggleEditingTitle = (id: string, index: number) => {
    setLinks(
      links.map((card) =>
        card.id === id
          ? {
              ...card,
              isEditingTitle: !card.isEditingTitle,
              urlTitle:
                card.urlTitle.trim() === ""
                  ? `Custom Link ${index + 1}`
                  : card.urlTitle,
            }
          : card
      )
    );
  };

  const handleUrlChange = (id: string, value: string) => {
    setLinks(
      links.map((card) =>
        card.id === id
          ? { ...card, url: value, isValidUrl: isUrlValid(value) }
          : card
      )
    );
  };

  const handleDelete = (id: string) => {
    setLinks(links.filter((card) => card.id !== id));
    deleteCustomLinks.mutateAsync({ id: userId, linkId: id });
    toast.success(t("deleted"));
  };

  const toggleShow = (id: string) => {
    setLinks(
      links.map((card) =>
        card.id === id ? { ...card, show: !card.show } : card
      )
    );
  };

  return (
    <div
      className={`w-full mt-8 ${
        isSideBarClosed ? "lg:w-[55%]" : "lg:w-[70%] mx-auto"
      } xl:w-[60%]`}
    >
      <div className="flex flex-col items-center px-4 py-6 space-y-4 border border-gray-200 rounded-3xl md:p-6">
        <BioAndHeader />
        <div className="w-full space-y-4">
          <button
            onClick={addCard}
            className="w-full bg-indigo-500 hover:bg-indigo-600 transition-all duration-200 flex justify-center rounded-full py-3 text-white font-semibold mb-4 shadow-md"
          >
            {t("addLink")}
          </button>
          {links?.map((link, index) => (
            <Card key={link.id} className="w-full">
              <CardHeader className="py-5 px-4 lg:py-6">
                <div className="flex flex-col sm:flex-row w-full justify-between items-center">
                  <div className="w-full flex items-center gap-3 justify-between sm:justify-start">
                    {link.isEditingTitle ? (
                      <Input
                        type="text"
                        className="flex-1 border-gray-300 font-semibold"
                        value={link.urlTitle}
                        onChange={(e) =>
                          handleInputChange(link.id, "urlTitle", e.target.value)
                        }
                        onBlur={() => toggleEditingTitle(link.id, index)}
                        autoFocus
                      />
                    ) : (
                      <CardTitle className="text-lg sm:text-2xl w-56 sm:w-auto truncate">
                        {link.urlTitle}
                      </CardTitle>
                    )}
                    {!link.isEditingTitle && (
                      <PencilIcon
                        className="w-5 h-5 cursor-pointer"
                        onClick={() => toggleEditingTitle(link.id, index)}
                      />
                    )}
                  </div>
                  <div className="w-full flex items-center gap-3 sm:gap-2 justify-end sm:justify-normal pt-4 sm:pt-0">
                    <Switch.Group
                      as="div"
                      className="flex items-center gap-x-1.5 gap-y-1"
                    >
                      <Switch.Label as="span" className="text-sm">
                        <span className="font-medium sm:block text-gray-600">
                          {!link.show ? t("show") : t("hide")}
                        </span>
                      </Switch.Label>
                      <Switch
                        checked={!link.show}
                        onChange={() => toggleShow(link.id)}
                        className={classNames(
                          !link.show ? "bg-indigo-600" : "bg-gray-200",
                          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={classNames(
                            !link.show ? "translate-x-5" : "translate-x-0",
                            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                          )}
                        />
                      </Switch>
                    </Switch.Group>
                    {index !== 0 && (
                      <div className="relative">
                        <Button
                          variant="outline"
                          className="rounded-full px-2 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200"
                          onClick={() => {
                            setSelectedLink(link);
                            setIsDeleteModalOpen(true);
                          }}
                        >
                          <TrashIcon className="w-4 sm:w-5 h-4 sm:h-5" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col space-y-2 py-5 px-4 lg:px-6 pt-2 lg:pt-0 lg:pb-6">
                <Input
                  type="text"
                  placeholder={t("enterUrl")}
                  className="flex-1 border-gray-300 py-3"
                  value={link.url}
                  onChange={(e) => handleUrlChange(link.id, e.target.value)}
                />
                {!link.isValidUrl && (
                  <span className="text-red-500 text-sm">
                    {t("enterValidUrl")}
                  </span>
                )}
              </CardContent>
            </Card>
          ))}
          <SocialMediaWithToggle />
        </div>
        <Button
          className="w-full lg:hidden text-white bg-black py-3"
          onClick={() => {
            setLeetFormVisible(false);
            window.scrollTo(0, 0);
          }}
        >
          {t("preview")}
        </Button>
      </div>
      <DeleteModal
        title={selectedLink.urlTitle}
        handleDelete={() => handleDelete(selectedLink.id)}
        open={isDeleteModalOpen}
        setOpen={setIsDeleteModalOpen}
        deleteProfileMsg={t("deleteMsg")}
      />
    </div>
  );
}
