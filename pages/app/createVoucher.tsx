import { Box, Image, Text, Input, Button } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAccount } from "wagmi";
import Layout from "../../src/components/Layout";
import MenuHeader from "../../src/components/MenuHeader";
import ProfileCard from "../../src/components/ProfileCard";

const CreateVoucher = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { address } = useAccount();
  const [selectPolicy, setSelectPolicy] = useState<string>();
  const [inputAddress, setInputAddress] = useState<string>();
  const [name, setName] = useState<string>();
  const [supply, setSupply] = useState<string>();
  const [description, setDescription] = useState<string>();

  if (!session) return <> hell</>;

  return (
    <>
      <Layout title="Ethernal | Voucher">
        <MenuHeader title={"Create Voucher"} />
        <Box textAlign="left">
          {address ? (
            <>
              <Box>
                <Text> {address} </Text>
              </Box>
              <Box>
                <Text> Name </Text>
                <Input
                  placeholder="name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <Text> Supply </Text>
                <Input
                  placeholder="Supply"
                  onChange={(e) => {
                    setSupply(e.target.value);
                  }}
                />
                <Text> Description </Text>
                <Input
                  placeholder="Description"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </Box>
              <Text> Please select minting condition for NFT voucher </Text>
              <Box display="flex" flexDir="row" justifyContent="space-evenly">
                <Box
                  bgColor="success"
                  borderRadius="16px"
                  padding="10px 20px"
                  onClick={() => setSelectPolicy("anyone")}
                >
                  Anyone
                </Box>
                <Box
                  bgColor="error"
                  borderRadius="16px"
                  padding="10px 20px"
                  onClick={() => setSelectPolicy("tokengate")}
                >
                  Token Gate
                </Box>
              </Box>
              <Text> choosen policy : {selectPolicy}</Text>
              {selectPolicy == "tokengate" && (
                <Box>
                  <Text> Put NFT address </Text>
                  <Input
                    placeholder="Token gated address"
                    onChange={(e) => {
                      setInputAddress(e.target.value);
                    }}
                  />
                </Box>
              )}
              <Box textAlign="right">
                <Button
                  onClick={() =>
                    console.log({
                      selectPolicy,
                      inputAddress,
                      name,
                      supply,
                      description,
                    })
                  }
                >
                  {" "}
                  create{" "}
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Box>
                <ConnectButton />
                <Image src="connect-wallet.jpeg" alt={"connect pls"} />
              </Box>
            </>
          )}
        </Box>
      </Layout>
    </>
  );
};

export default CreateVoucher;