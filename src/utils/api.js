import axios from 'axios';

const API_BASE_URL = 'https://crudcrud.com/api/bb177f493ad24cd48619b005d96546ff';

const formatToSlug = (str) => {
  return str.toLowerCase().replace(/\s+/g, '-');
};

export const getAllItems = async (sortBy = 'year') => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    const resourceNames = response.data;

    const sneakers = await Promise.all(
      resourceNames.map(async (resourceName) => {
        try {
          const response = await axios.get(`${API_BASE_URL}/${resourceName}`);
          
          return response.data;
        } catch (error) {
          console.error(`Error fetching details for ${resourceName}:`, error);
          return null;
        }
      })
    );

    const filteredSneakers = sneakers.filter((sneaker) => sneaker !== null);
    const flattenedSneakers = filteredSneakers.flat();

    if (sortBy === 'year') {
      flattenedSneakers.sort((a, b) => a.year - b.year);
    } else if (sortBy === 'size') {
      flattenedSneakers.sort((a, b) => a.size - b.size);
    } else if (sortBy === 'price') {
      flattenedSneakers.sort((a, b) => a.price - b.price);
    }
    
    return flattenedSneakers;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};

export const createItem = async (itemData) => {
  try {
    const formattedName = formatToSlug(itemData.name);
    const response = await axios.post(`${API_BASE_URL}/${formattedName}`, itemData);
    return response.data;
  } catch (error) {
    console.error('Error creating item:', error);
    throw error;
  }
};

export const updateItem = async (itemData) => {
  try {
    const { _id, ...jsonData } = itemData;
    const formattedName = formatToSlug(jsonData.name);
    const url = `${API_BASE_URL}/${formattedName}/${_id}`
    console.log(url)
    console.log(jsonData)
    const response = await axios.put(url, jsonData);
    return response.data;
  } catch (error) {
    console.error('Error updating item:', error);
    throw error;
  }
};


export const deleteSneaker = async (sneakerName, sneakerId) => {
  try {
    const formattedName = formatToSlug(sneakerName);
    const url = `${API_BASE_URL}/${formattedName}/${sneakerId}`;

    const response = await axios.delete(url);
    return response.data;
  } catch (error) {
    console.error('Error deleting sneaker:', error);
    if (error.response) {
      console.error('Server Response:', error.response.status, error.response.data);
    }
    throw error;
  }
};

export const searchSneaker = async (searchTerm) => {
  try {
    const allResources = await axios.get(`${API_BASE_URL}`);
    const resourcesArray = allResources.data;
    const matchedResource = resourcesArray.find((resource) =>
      resource.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log(matchedResource)
    if (matchedResource) {
      const specificResource = await axios.get(`${API_BASE_URL}/${matchedResource}`);
      
      return specificResource.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error searching sneaker:', error);
    throw error;
  }
};
