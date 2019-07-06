
/* eslint-disable max-statements */
export const calculateDistance = (_lat1, _long1, _lat2, _long2) => {
    const R = 6372795;
    const lat1 = (_lat1 * Math.PI) / 180;
    const lat2 = (_lat2 * Math.PI) / 180;
    const long1 = (_long1 * Math.PI) / 180;
    const long2 = (_long2 * Math.PI) / 180;
    const cl1 = Math.cos(lat1);
    const cl2 = Math.cos(lat2);
    const sl1 = Math.sin(lat1);
    const sl2 = Math.sin(lat2);
    const delta = long2 - long1;
    const cdelta = Math.cos(delta);
    const sdelta = Math.sin(delta);
    const y = Math.sqrt(((cl2 * sdelta) ** 2) + (((cl1 * sl2) - (sl1 * cl2 * cdelta)) ** 2));
    const x = (sl1 * sl2) + (cl1 * cl2 * cdelta);
    const ad = Math.atan2(y, x);
    const distance = (ad * R) / 1000;
    /* eslint-disable no-restricted-globals */
    return isNaN(distance) ? -1 : Number(distance.toFixed(2));
};
