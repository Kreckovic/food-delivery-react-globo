import{ useState, useEffect } from 'react';
import { db, auth } from '../firebase-config';
import { collection, getDocs} from 'firebase/firestore';
import { onAuthStateChanged, signOut, } from 'firebase/auth';
import { async } from '@firebase/util'

import './Home.css'

export const Home = () => {



    const logout = async() => {
      await signOut(auth)
    }
    
    const [user, setUser] = useState({});

    const [food, setFoods] = useState([])
  
    const [orders, setOrders] = useState([])

    const add = (izbor) => {
      const postoji = orders.find((x) => x.id === izbor.id)


        if (postoji) {
          setOrders(
            orders.map((order) => order.id === izbor.id ? { ...postoji, kolicina: postoji.kolicina + 1} : order)
          )
        }else{
          setOrders([...orders, { ...izbor, kolicina: 1}])
        }
    }

    const totalPrice = () => {

      let total = 0;

      orders.map((order) => total = total + order.price * order.kolicina)

      return total;
    }

    const obrisi = (izbor) => {

      setOrders(orders.filter((order) => order.id != izbor.id))

    }

    onAuthStateChanged(auth, (currentUser) => {setUser(currentUser);});


    const remove = (izbor) => {
      const postoji = orders.find((x) => x.id === izbor.id)

      if(postoji){
        if(postoji.kolicina === 1){
          setOrders(orders.filter((order) => order.id != izbor.id))
        }else{
          setOrders(
            orders.map((order) => order.id === izbor.id ? { ...postoji, kolicina: postoji.kolicina - 1} : order)
          )
        }
      }
    }

    const [drink, setDrinks] = useState([])
  

  
    useEffect(() => {
        const dbRef = collection(db, 'food')
        const dbRefa = collection(db, 'drinks')
  
      const getFood = async () => {
            const data = await getDocs(dbRef)
          console.log(data)
          setFoods(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
      };
  
      getFood();
  
      const getDrinks = async () => {
        const data = await getDocs(dbRefa)
        console.log(data)
        setDrinks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
    };
  
    getDrinks();
  
    },[])
  
   
  
    
    return (
      <div className="App">
        {
          user? (<div>
            User: {user.email}
            <button onClick={() => logout()}>Logout</button>
          </div>):
          (<div><p> korisnik nije ulogovan </p></div>)
        }
        <div className='nekahrana'>
        {
          
          food.map((jelo) => {
            return(
                <div className='menuCard'>
                  <div className='menuImg'>
                 <img src={jelo.img}></img>
                 </div> 
                 <div className='menuInfo'>
                 <h3>{jelo.name}</h3>
                  <h4>{jelo.description}</h4>
                  <h5>{jelo.price}RSD</h5>
                  <button onClick={() => add(jelo)}>Add to cart</button>
                 </div> 
                 
                 
                </div>
            )
          })
          
        }
        </div>
        <div className='nekopice'>
        {
          
          drink.map((pice) => {
            return(
                <div className='menuCard'>
                  <div className='menuImg'>
                 <img src={pice.img}></img>
                 </div> 
                 <div className='menuInfo'>
                 <h3>{pice.name}</h3>
                  <h4>{pice.description}</h4>
                  <h5>{pice.price}RSD</h5>
                  <button onClick={() => add(pice)}>Add to cart</button>
                 </div> 
                 
                 
                </div>
                
            )
          })
        }
          </div>
          <div className='korpa'>
              <h3> KORPA  </h3>
              {
          
          orders.map((order) => {
            return(
                <div className='order'>
                  <h4>{order.name}</h4>
                  <h4>{order.price} RSD</h4>
                  <button onClick={() => remove(order)}> - </button>
                  <h4>{order.kolicina}</h4>
                  <button onClick={() => add(order)}> + </button>
                  <h4> ukupno {order.price * order.kolicina} RSD</h4>
                  <button onClick={() => obrisi(order)}> X </button>

                </div>
            )
          })
        }
        <h4> Ukupno za naplatu:  {totalPrice() * 1.05}</h4>
        <h4>dostava je uracunata u cenu</h4>
          </div>

        
      </div>
    );

}