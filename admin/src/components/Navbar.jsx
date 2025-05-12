import { assets } from '../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between' >
        <img className='w-[max(10%,80px)]' src= {assets.logo} alt =""/>
    <button  onClick= {()=> setToken("")} className='bg-black text-white px-4 py-2 rounded-md'>Logout</button>

 </div>)}
export default Navbar