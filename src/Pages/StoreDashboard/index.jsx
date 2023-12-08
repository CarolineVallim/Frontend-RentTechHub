import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Card, Grid, Tab, TabGroup, TabList, TabPanel, TabPanels, Text, Metric, DonutChart, List, ListItem, Flex, BadgeDelta, Divider, ProgressBar } from "@tremor/react";
import { Divider as DividerNext } from "@nextui-org/react";
import { AuthContext } from '../../Context/auth.context';
import { Input, Button } from "@nextui-org/react";

export default function StorePage() {
  const { user } = useContext(AuthContext);
  const [userProducts, setUserProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    image: "",
    rentalPrice: 0,
    stock: 0,
  });

  useEffect(() => {
    console.log("User ID:", user?._id);
    const fetchUserProducts = async () => {
      try {
        if (user && user._id) {
          const response = await axios.get(`https://rent-tech-hub.adaptable.app/api/products/user/${user._id}`);
          console.log("Server Response:", response.data);
          setUserProducts(response.data);
        }
      } catch (error) {
        console.error("Error fetching user products:", error);
        setUserProducts([]);
      }
    };

    fetchUserProducts();
  }, [user]);

  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete(`https://rent-tech-hub.adaptable.app/api/products/${productId}`);
      console.log("Product deleted:", response.data);
      const updatedProducts = userProducts.filter((product) => product._id !== productId);
      setUserProducts(updatedProducts);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(`https://rent-tech-hub.adaptable.app/api/${user._id}/product/new`, newProduct);
      console.log("Product created:", response.data);
      setUserProducts([...userProducts, response.data]);
      setNewProduct({
        name: "",
        description: "",
        image: "",
        rentalPrice: 0,
        stock: 0,
      });
    } catch (error) {
      console.error("Error creating product:", error);
    } finally {
      setIsLoading(false);
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
                        colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
                      />
                      <DividerNext orientation="vertical" style={{marginRight:"30px"}}/>
                      <List className="w-2/3" style={{marginTop:"10px", marginBottom:"10px"}}>
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
              <div className="h-80">
                <Text>Your Products</Text>
                {console.log("userProducts:", userProducts)}
                {Array.isArray(userProducts) ? (
                  userProducts.map((product, index) => (
                    <div
                      className="product-container"
                      key={product._id}
                      style={{
                        flexBasis: '300px',
                        marginBottom: '20px',
                        marginRight: '25px',
                        marginLeft: '25px',
                        boxSizing: 'border-box',
                        paddingRight: '25px',
                        paddingLeft: '25px',
                        width:"200px",
                        height:"280px",
                        marginTop:"20px",
                        display:"flex",
                        flexDirection:"row"
                      }}
                    >
                      <p>{product.name}</p>
                      <img src={product.image} style={{width:"180px", height:"auto"}}/>
                      <p style={{marginBottom:"10px"}}>Price: {product.rentalPrice}€</p>
                      <Button style={{backgroundColor:"red", width:"110px", height:"25px", placeItems:"middle", color:"white"}} onClick={() => handleDelete(product._id)}>Remove product</Button>
                    </div>
                  ))
                ) : (
                  <p>No products available</p>
                )}
              </div>
            </Card>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-6">
              <Card>
                <div>
                <div className="modal-content p-4">
                <form onSubmit={handleFormSubmit}>
                    <label htmlFor="name" className="block mb-2">
                      Name
                    </label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      required
                      bordered
                      className="w-full mb-4"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    />

                    <label htmlFor="description" className="block mb-2">
                      Description
                    </label>
                    <Input
                      type="text"
                      id="description"
                      name="description"
                      required
                      bordered
                      className="w-full mb-4"
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    />

                    <label htmlFor="image" className="block mb-2">
                      Image
                    </label>
                    <Input
                      type="text"
                      id="image"
                      name="image"
                      bordered
                      className="w-full mb-4"
                      value={newProduct.image}
                      onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    />

                    <label htmlFor="rentalPrice" className="block mb-2">
                      Rental Price
                    </label>
                    <Input
                      type="number"
                      id="rentalPrice"
                      name="rentalPrice"
                      required
                      bordered
                      className="w-full mb-4"
                      value={newProduct.rentalPrice}
                      onChange={(e) => setNewProduct({ ...newProduct, rentalPrice: e.target.value })}
                    />

                    <label htmlFor="stock" className="block mb-2">
                      Stock
                    </label>
                    <Input
                      type="number"
                      id="stock"
                      name="stock"
                      required
                      bordered
                      className="w-full mb-4"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    />

                    <Button
                      type="submit"
                      className="text-white py-2 px-4 rounded hover:bg-blue-700"
                      isLoading={isLoading}
                      style={{ backgroundColor: '#4CAF4F', color: 'white' }}
                    >
                      Submit
                    </Button>
                  </form>
                </div>
                </div>
              </Card>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}
