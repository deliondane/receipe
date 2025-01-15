import axios from 'axios';
import {useState, useEffect, createContext} from 'react'
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Recipe from './pages/Recipe';
import Category from './pages/Category';
import Nav from './components/Nav';
import './scss/App.scss';

const DataContext=createContext();
function App({children}) {
  const APIKEY=process.env.REACT_APP_API_KEY;
  const [loading, setLoading]=useState(true);
  const [data, setData]=useState([]);
  /* const [loading, setLoding] = useState({state:true, data: []}); */

  const getDB = async () => {
    //d1d505e5857e48eb9a21	
    try{
      const {data}= await axios.get(`http://openapi.foodsafetykorea.go.kr/api/${APIKEY}/COOKRCP01/json/1/20`);
      setData(data.COOKRCP01.row)
      console.log(data)
    }catch(err){
      console.error('데이터 불러오는데 실패했습니다', err)
    }
  }

  useEffect(()=>{
    getDB();
    setLoading(false)
  }, [])

  return (
    <DataContext.Provider value={{data, loading}}>
    <Nav />
    <Routes>
      {/* <Route path='/' element={<Nav />} /> */}
      <Route path="/" element={<Home />} />
      <Route path="/recipe/:id" element={<Recipe />} />
      <Route path="/category/:category" element={<Category />} />
    </Routes>
    </DataContext.Provider>
  );
}

export default App;
export {DataContext}
