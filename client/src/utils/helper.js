const helpers = {
    isJsonString: (data) => {
        try {
            JSON.parse(data)
        } catch (error) {
            return false
        }
        return true;
    },
    dateFormat: (date) => {
        return new Date(date).toLocaleString('vi-VN', {
            dateStyle: 'short',
            timeStyle: 'short'
        })
    },
    numberFormat: num => new Intl.NumberFormat().format(Number(num)),
    roundNumber: (number) => { return Math.floor(number / 1000) * 1000 },
    maskEmail: (email) => {
        const [localPart, domain] = email.split('@');

        const firstChar = localPart[0];
        const lastTwoChars = localPart.slice(-2);

        const maskedLocalPart = firstChar + '*********' + lastTwoChars;

        return maskedLocalPart + '@' + domain;
    },
    validatePhoneNumber: (phoneNumber) => {
        const phoneRegex = /^(0|\+84)(3|5|7|8|9)\d{8}$/;
        return phoneRegex.test(phoneNumber);
    }
}
export default helpers