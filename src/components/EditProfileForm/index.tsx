import { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Image,
  SimpleGrid,
  Center,
  Text,
  Container,
  Button,
  Divider,
  Spinner,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { getNFTCollection } from "../../utils/getNFTCollection";

const EditProfileForm = () => {
  const { address } = useAccount();
  const [profile, setProfile] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [isLoading2, setIsLoading2] = useState(false);
  const [location, setLocation] = useState<any>({});

  const [nfts, setNfts] = useState<any>();

  const [displayName, setDisplayName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [nftCollection, setNftCollection] = useState<any>();

  const [selectCollection, setSelectCollection] = useState<any>();

  const isSelected = (c: any) => {
    const data = selectCollection.find(
      (item: any) => item.address === c.address
    );

    return data ? true : false;
  };

  const handleSelectImage = (nft: any) => {
    const data = selectCollection.find(
      (item: any) => item.address === nft.address
    );

    if (data) {
      setSelectCollection(
        selectCollection.filter((item: any) => item.address !== nft.address)
      );
    } else {
      if (selectCollection.includes(nft)) {
        setSelectCollection(
          selectCollection.filter((item: any) => item.address !== nft.address)
        );
      } else {
        setSelectCollection([...selectCollection, nft]);
      }
    }
  };

  const getProfileData = async () => {
    const res = await fetch("/api/profile");
    const data = await res.json();
    setDisplayName(data.display_name);
    setDescription(data.description);
    setNftCollection(data.nft_collections);
    setSelectCollection(data.tags);
    setProfile(data);
    setLoading(false);
  };

  useEffect(() => {
    getProfileData();
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    if (!address) return;
    setIsLoading2(true);
    getNFTCollection(address).then((data) => {
      setIsLoading2(false);
      setNfts(data);
    });
  }, [address]);

  return (
    <>
      {/* <Center>
        <Box>
          <Image
            h="80px"
            src={profile?.profile_picture}
            alt="twitter pfp"
            borderRadius="50%"
          />
        </Box>
      </Center>
      <Center>
        <Text mt={2} mb={4}>
          {profile?.display_name}
        </Text>
      </Center>

      <Box>
        <FormControl>
          <FormLabel>Display Name: </FormLabel>
          <Input placeholder="Display name" value={displayName} />
        </FormControl>
      </Box>

      <Box mt={3}>
        <FormControl>
          <FormLabel>Your Description: </FormLabel>
          <Textarea placeholder="About you" value={description} />
        </FormControl>
      </Box>

      <Box mt={3}>
        <SimpleGrid minChildWidth="150px" spacing="20px">
          {nftCollection?.map((c: any) => {
            return (
              <Box
                key={c.address}
                style={{ cursor: "pointer" }}
                onClick={() => handleSelectImage(c)}
                boxShadow={isSelected(c) ? "0px 0px 3px #f98e8e" : "none"}
                h="100%"
                border={
                  isSelected(c) ? "1px solid #f85756" : "1px #f5f5f5 solid"
                }
                borderRadius="16px"
              >
                <Box pt={4} pr={4} pl={4} height="80px">
                  <Text fontWeight="bold" fontSize="lg"></Text>
                  <Text fontSize="xs" mt={3}>
                    {c.name}
                  </Text>
                </Box>
              </Box>
            );
          })}
        </SimpleGrid>
      </Box> */}
      <Container maxW="2xl">
        <Center>
          <Box>
            <Image
              h="80px"
              src={profile?.profile_picture}
              alt="twitter pfp"
              borderRadius="50%"
            />
          </Box>
        </Center>
        <Center>
          <Text mt={2} mb={4}>
            {profile?.diaplay_name}
          </Text>
        </Center>

        <Box>
          <FormControl>
            <FormLabel>
              <Text className="h5-bold">Display Name:</Text>
            </FormLabel>
            <Input
              value={displayName}
              placeholder={profile?.diaplay_name}
              // onChange={handleDisplayNameChange}
            />
          </FormControl>
        </Box>

        <Box mt={3}>
          <FormControl>
            <FormLabel>
              <Text className="h5-bold">Your Description:</Text>
            </FormLabel>
            <Textarea
              maxLength={50}
              placeholder={"description"}
              value={description}
              // onChange={handleDescriptionChange}
            />
          </FormControl>
          <Box mt={2} textAlign="right">
            <Text fontSize="xs" color="gray.500">
              Max 50 Characters
            </Text>
          </Box>
        </Box>
      </Container>
      <Container maxW="2xl">
        <Box>
          <Box>
            <Text className="h5-bold" mt={3}>
              Select NFT Communities you want to represent{" "}
              <small>(Optional)</small>
            </Text>
            <Text className="subtitle" mt={2}>
              (You have to connect your wallet to claim vouchers/represent your
              NFT communities)
            </Text>
          </Box>

          <Box>
            {/* {isLoading2 && <Spinner />} */}
            <SimpleGrid columns={1}>
              {nftCollection && (
                <>
                  <Box mt={3} width="100%">
                    <SimpleGrid minChildWidth="150px" spacing="20px">
                      {nftCollection?.map((c: any) => {
                        return (
                          <Box
                            key={c.address}
                            style={{ cursor: "pointer" }}
                            onClick={() => handleSelectImage(c)}
                            boxShadow={
                              isSelected(c) ? "0px 0px 3px #f98e8e" : "none"
                            }
                            h="100%"
                            border={
                              isSelected(c)
                                ? "1px solid #f85756"
                                : "1px #f5f5f5 solid"
                            }
                            borderRadius="16px"
                          >
                            <Center>
                              <Box pt={4} pr={4} pl={4} height="auto">
                                <Center>
                                  <Image
                                    style={{ objectFit: "cover" }}
                                    borderRadius={10}
                                    src={c.image ? c.image : c.NFTs[0].image}
                                    alt={c.name}
                                    h="100px"
                                    w="100px"
                                  />
                                </Center>

                                <Center>
                                  <Text fontSize="xs" mt={3} mb={2}>
                                    {c.name}
                                  </Text>
                                </Center>
                              </Box>
                            </Center>
                          </Box>
                        );
                      })}
                    </SimpleGrid>
                  </Box>
                </>
              )}
            </SimpleGrid>
          </Box>

          <Box style={{ alignSelf: "self-end" }} mt={5} textAlign="center">
            <Divider />
            <Button
              mt={2}
              w="100%"
              mr={5}
              borderRadius="12px"
              bgColor="primary.0"
              _hover={{ bgColor: "primary.100" }}
              _active={{ bgColor: "primary.100" }}
              _focus={{ border: "none" }}
              color="white"
              disabled={!location}
              // onClick={handleRegiser}
            >
              Update Profile
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default EditProfileForm;
