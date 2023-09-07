import { getData } from "../API/api.js";
import { getHash } from "../utils/utils.js"

let data = null;

export const renderData = async () => {
  const hash = getHash().replace('/', '');

  if (!hash) {
    return;
  }

  // data = !data 
  //   ? await getData(hash)
  //   : data;

  data = await getData(hash);

  console.log(data);
}