import { resumeState } from "@state/state";
import React, { useCallback } from "react";
import Autocomplete from "react-google-autocomplete";
import { useRecoilState } from "recoil";

export default function AddressAutoComplete() {
  const [userInfo, setUserInfo] = useRecoilState(resumeState);

  const extractAddressWithoutPostalCode = (addressComponents: any[]) =>
    addressComponents
      .filter(
        (component) =>
          component.types.includes("locality") ||
          component.types.includes("administrative_area_level_1") ||
          component.types.includes("country")
      )
      .map((component) => component.long_name)
      .join(", ");

  const updateUserInfoAddress = useCallback(
    (address: string) => {
      if (userInfo) {
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          address,
        }));
      }
    },
    [userInfo, setUserInfo]
  );

  return (
    <div data-testid="addressAuto">
      <Autocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_AUTO_COMPLETE_ADDRESS_API}
        className="inputForm rounded-md h-10"
        onPlaceSelected={(place) => {
          const formattedAddress = extractAddressWithoutPostalCode(
            place?.address_components ?? []
          );
          updateUserInfoAddress(formattedAddress);
        }}
        onBlur={(e) => {
          e && updateUserInfoAddress(e.currentTarget.value);
        }}
        placeholder={userInfo.address}
        defaultValue={userInfo.address ?? ""}
      />
    </div>
  );
}
