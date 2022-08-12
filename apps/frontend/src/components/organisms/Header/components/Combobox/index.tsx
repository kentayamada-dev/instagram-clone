import { Box, Center, Input, List, ListItem, Spinner, useColorModeValue } from "@chakra-ui/react";
import { useCombobox } from "downshift";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React from "react";
// eslint-disable-next-line camelcase
import { unstable_serialize, useSWRConfig } from "swr";
import { constants } from "../../../../../constants";
import { useDebounce } from "../../../../../hooks/useDebounce";
import { USERS_FILTER_QUERY } from "../../../../../hooks/useUsers/schema";
import { fetcher } from "../../../../../libs/graphql_request";
import { wait } from "../../../../../utils/wait";
import { UserCard } from "../../../../molecules/userCard";
import type { UsersFilterQuery } from "../../../../../generated";
import type { ComboboxType } from "./index.types";

const {
  COLORS: { EBONY, WHITE, SNOW }
} = constants;

export const Combobox: ComboboxType = () => {
  const debounce = useDebounce(1000);
  const bgColor = useColorModeValue(WHITE, EBONY);
  const selectedColor = useColorModeValue(SNOW, "#ffffff0a");
  const { cache } = useSWRConfig();
  const router = useRouter();
  const { t } = useTranslation("common");
  const [filteredUsers, setFilteredUsers] = React.useState<UsersFilterQuery["users"]["nodes"]>([]);
  const [isFetching, setIsFetching] = React.useState(false);
  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    inputValue,
    openMenu
  } = useCombobox({
    id: "search-box",
    itemToString(item) {
      return item ? item.id : "";
    },
    items: filteredUsers,
    onInputValueChange({ inputValue: value }) {
      const lowerCasedValue = value?.toLowerCase();
      setIsFetching(true);
      let cachedValue: UsersFilterQuery["users"]["nodes"] | null = null;
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      debounce(async () => {
        if (lowerCasedValue && lowerCasedValue.length > 0) {
          const cacheKey = unstable_serialize([USERS_FILTER_QUERY, { first: 10, userIdQuery: lowerCasedValue }]);
          cachedValue = cache.get(cacheKey) ?? null;

          if (!cachedValue) {
            // eslint-disable-next-line require-atomic-updates
            cachedValue = await fetcher<UsersFilterQuery>(USERS_FILTER_QUERY, {
              first: 10,
              userIdQuery: lowerCasedValue
            }).then((data) => data.users.nodes);
            cache.set(cacheKey, cachedValue);
          }

          await wait(1);
          setIsFetching(false);
          setFilteredUsers(cachedValue ?? []);
        }
      });
    },
    onSelectedItemChange: ({ selectedItem: newSelectedItem }) => {
      if (newSelectedItem?.id) {
        // eslint-disable-next-line no-void
        void router.push(`/${newSelectedItem.id}/`);
      }
    },
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges;
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            inputValue: state.inputValue
          };
        case useCombobox.stateChangeTypes.InputBlur:
          return {
            ...changes,
            inputValue: state.inputValue
          };
        default:
          return changes;
      }
    }
  });

  return (
    <>
      <Box {...getComboboxProps()}>
        <Input
          placeholder={t("search")}
          {...getInputProps({
            onFocus: openMenu
          })}
        />
      </Box>
      <List
        h="80"
        spacing={3}
        {...getMenuProps()}
        bgColor={bgColor}
        boxShadow="md"
        display={isOpen ? "block" : "none"}
        left="-60px"
        mt="13px"
        overflowY="auto"
        position="absolute"
        rounded="md"
        w="96"
      >
        {inputValue.length ? (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <>
            {isFetching ? (
              <Center h="100%">
                <Spinner size="lg" />
              </Center>
            ) : (
              // eslint-disable-next-line react/jsx-no-useless-fragment
              <>
                {filteredUsers.length ? (
                  filteredUsers.map((user, index) => (
                    // eslint-disable-next-line react/jsx-indent
                    <ListItem
                      _hover={{
                        cursor: "pointer"
                      }}
                      bg={highlightedIndex === index && selectedColor}
                      key={user.id}
                      opacity={highlightedIndex === index && "1.5"}
                      {...getItemProps({ index, item: user })}
                      css={{
                        listStyleType: "none"
                      }}
                    >
                      <UserCard size={35} src={user.imageUrl} userId={user.id} userName={user.name} />
                    </ListItem>
                  ))
                ) : (
                  <Center h="100%">{t("noResultsFound")}</Center>
                )}
              </>
            )}
          </>
        ) : (
          <Center h="100%">{t("noResultsFound")}</Center>
        )}
      </List>
    </>
  );
};
