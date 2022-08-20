import { Popover, PopoverTrigger, Button, PopoverContent, PopoverArrow } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { StyledAvatar } from "../../atoms/StyledAvatar";
import type { AvatarLogoutPopoverType } from "./index.types";

export const AvatarLogoutPopover: AvatarLogoutPopoverType = ({ handleLogout, alt, src, size }) => {
  const { t } = useTranslation("common");

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Button borderRadius="full" p="0px">
          <StyledAvatar alt={alt} size={size} src={src} />
        </Button>
      </PopoverTrigger>
      <PopoverContent w="48">
        <PopoverArrow />
        <Button onClick={handleLogout}>{t("logout")}</Button>
      </PopoverContent>
    </Popover>
  );
};
