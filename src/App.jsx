import { Box, Button, Image, Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getData } from "./reudx/action";

function App() {

  const [limit, setLimit] = useState(50);
  let items = useSelector((store)=>(store.data));
  items = items.slice(0,limit);
  console.log("items",items);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getData());
  },[limit])

  return (
    <Box>
      <Text  mt={3} textAlign="center" fontSize="3xl" fontWeight="semibold">Welcome</Text>
      <Box  mt={6} >
        <TableContainer border="1px solid black" p={5} maxWidth="90%" m="auto">
          <Table size="sm" variant='simple'>
            <Thead>
              <Tr>
                <Th isNumeric>Rank</Th>
                <Th>Name</Th>
                <Th isNumeric>Price</Th>
                <Th isNumeric>Market Cap</Th>
                <Th isNumeric>VWAP(24Hr)</Th>
                <Th isNumeric>Supply</Th>
                <Th isNumeric>Volume(24Hr)</Th>
                <Th isNumeric>Change(24Hr)</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                items.map((ele)=>{
                  return (
                    <Tr key={ele.id}>
                      <Td isNumeric>{ele.rank}</Td>
                      <Td>
                        <Box display="flex" gap={3} alignItems="center" cursor="pointer">
                            <Box height="40px" w="40px">
                              <Image src={`https://assets.coincap.io/assets/icons/${ele.symbol.toLowerCase()}@2x.png`} ></Image>
                            </Box>
                            <Box>
                              <Text fontSize="md">{ele.name}</Text>
                              <Text fontSize="xs" mt={1}>{ele.symbol}</Text>
                            </Box>
                        </Box>
                      </Td>
                      <Td isNumeric>${Number(ele.priceUsd).toFixed(2)}</Td>
                      <Td isNumeric>${Number(ele.marketCapUsd).toFixed(2)}b</Td>
                      <Td isNumeric>${Number(ele.vwap24Hr).toFixed(2)}</Td>
                      <Td isNumeric>{Number(ele.supply).toFixed(2)}</Td>
                      <Td isNumeric>{Number(ele.volumeUsd24Hr).toFixed(2)}</Td>
                      <Td isNumeric textColor={Number(ele.changePercent24Hr) < 0 ? "red" : "green" }>{Number(ele.changePercent24Hr).toFixed(2)}</Td>
                    </Tr>
                  )
                })
              }
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Box align="center" mt={3} mb={8}>
        <Button onClick={()=>setLimit(()=>limit+50)}>Load More...</Button>
      </Box> 
    </Box>
  )
}

export default App
