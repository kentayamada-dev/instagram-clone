import { Popover, PopoverTrigger, Button, PopoverContent, PopoverArrow } from "@chakra-ui/react";
import { useTypeSafeTranslation } from "../../../libs/next_translate";
import { StyledAvatar } from "../../atoms/StyledAvatar";
import type { AvatarPopoverType } from "./index.types";

export const AvatarPopover: AvatarPopoverType = ({ handleLogout, alt, size, src }) => {
  const { t } = useTypeSafeTranslation("common");

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Button borderRadius="full" p="0px">
          <StyledAvatar alt={alt} size={size} src={src} />
        </Button>
      </PopoverTrigger>
      <PopoverContent w="48">
        <PopoverArrow />
        <Button onClick={handleLogout} variant="ghost">
          {t("logout")}
        </Button>
      </PopoverContent>
    </Popover>
  );
};
