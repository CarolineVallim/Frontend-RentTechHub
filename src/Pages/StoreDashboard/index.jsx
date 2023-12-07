import { useState, useContext } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import { Card, Grid, Tab, TabGroup, TabList, TabPanel, TabPanels, Text, Title, BadgeDelta, Flex, Metric, ProgressBar, DonutChart, Divider, List, ListItem } from "@tremor/react"
import { Divider as DividerNext }  from "@nextui-org/react";
import { AuthContext } from '../../Context/auth.context';


export default function StorePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {user} = useContext(AuthContext);


  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  //const userId = user._id

  const handleFormSubmit = async (formData) => {
    try {
      console.log("User ID:", user._id);
      const response = await axios.post(`http://localhost:5005/api/${user._id}/product/new`, {
        name: formData.get("name"),
        description: formData.get("description"),
        image: formData.get("image"),
        rentalPrice: parseFloat(formData.get("rentalPrice")),
        stock: parseInt(formData.get("stock")),
        user: user._id,
      });
  
      console.log("Product Created:", response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };  

  const districts = [
    {
      name: "Lisboa",
      sales: 9800,
    },
    {
      name: "Porto",
      sales: 4567,
    },
    {
      name: "Faro",
      sales: 3908,
    },
    {
      name: "Coimbra",
      sales: 2400,
    },
    {
      name: "Braga",
      sales: 1908,
    },
    {
      name: "Aveiro",
      sales: 1398,
    },
  ];

  const names = districts.map(district => district.name);

  const valueFormatter = (number) => `€ ${new Intl.NumberFormat("eur").format(number).toString()}`;

  return (
    <div style={{ paddingTop: "85PX", marginLeft:"50px", marginRight:"50px" }}>
      <TabGroup className="mt-6">
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Add Product</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6">
              <Card>
                <div className="h-40">
                  <Flex alignItems="start">
                    <div>
                      <Text>Total Income</Text>
                      <Metric>€ 12,699</Metric>
                    </div>
                    <BadgeDelta deltaType="increase">12,699%</BadgeDelta>
                  </Flex>
                  <Divider />
                  <Flex className="mt-4">
                    <Text className="truncate">5.1% (€ 12,699)</Text>
                    <Text>€ 250,000</Text>
                  </Flex>
                  <ProgressBar value={15.9} className="mt-2" />
                </div>
              </Card>
              <Card>
                <div className="h-40">
                  <Text>Total Products</Text>
                  <Metric>4</Metric>
                  <Divider />
                  <Text>Currently Rented Products</Text>
                  <Metric>3</Metric>
                </div>
              </Card>
              <Card>
                <div className="h-40" style={{display:"flex", flexDirection:"row"}}>
                  <Flex>
                    <DonutChart
                        className="mt-6"
                        data={districts}
                        category="sales"
                        index="name"
                        valueFormatter={valueFormatter}
                        colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
                      />
                      <DividerNext orientation="vertical"/>
                      <List className="w-2/3">
                        {districts.map((item) => (
                          <ListItem key={item.name}>
                            <span>{item.name}</span>
                          </ListItem>
                        ))}
                      </List>
                  </Flex>
                </div>
              </Card>
            </Grid>
            <div className="mt-6">
              <Card>
                <div className="h-80" />
              </Card>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-6">
              <Card>
                <div>
                <button onClick={handleButtonClick}>Add Product</button>
                {isModalOpen && (
                  <div className="modal">
                    <div className="modal-content">
                      <span className="close" onClick={handleCloseModal}>
                        &times;
                      </span>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          const formData = new FormData(e.target);
                          handleFormSubmit(formData);
                        }}
                      >
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" required />
                        <label htmlFor="description">Description</label>
                        <input type="text" id="description" name="description" required />
                        <label htmlFor="image">Image</label>
                        <input type="text" id="image" name="image" />
                        <label htmlFor="rentalPrice">Rental Price</label>
                        <input type="number" id="rentalPrice" name="rentalPrice" required />
                        <label htmlFor="stock">Stock</label>
                        <input type="number" id="stock" name="stock" required />
                        <button type="submit">Submit</button>
                      </form>
                    </div>
                  </div>
                )}
                </div>
              </Card>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}
