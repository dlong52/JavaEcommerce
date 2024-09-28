const address = {
    fetchProvincesData: async () => {
        const provinces = "https://vapi.vnappmob.com/api/province/";
        const response = await fetch(provinces);
        const provincesData = await response.json();
        return provincesData.results;
    },
    fetchDistrictData: async (id) => {
        const district = `https://vapi.vnappmob.com/api/province/district/${id}`;
        const response = await fetch(district);
        const districtData = await response.json();
        return districtData.results;
    },
    fetchWardData: async (id) => {
        const ward = `https://vapi.vnappmob.com/api/province/ward/${id}`;
        const response = await fetch(ward);
        const wardData = await response.json();
        return wardData.results;
    },
}
export default address
