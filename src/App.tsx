import React, { FC, ChangeEvent} from "react";
import { useState, useDeferredValue, useMemo, useRef, useEffect } from 'react';
import "./App.css";

import Carousel from './Components/Carousel/Carousel';
import './components/Carousel/Carousel.css';

let num_id = 0;

interface Person {
  id: number;
  name: string;
  position: string;
  priority: number;
}

const App: FC = () => {
  const [pessoa, setPessoa] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [priority, setPriority] = useState<number>(0);
  const [people, setPeople] = useState<Person[]>([]);

  
  const [toggle, setToggle] = useState(true);

  const handleClick = () => {
    setToggle(!toggle);
  };

  const deferredPeople = useDeferredValue(people);
  const sortedPeople = useMemo(() => {
    const people = [...deferredPeople];
    people.sort((p1, p2) => {
      let v = p1.priority - p2.priority;
      if (v !== 0) return v;
      return p1.name.localeCompare(p2.name);
    });
    return people;
  }, [deferredPeople]);


  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "pessoa") {
      setPessoa(event.target.value);
    } if (event.target.name === "position") {
      setPosition(event.target.value);
    } else {
      setPriority(Number(event.target.value));
    }
  };

  const addPessoa = (): void => {
    //isso aqui vai virar a mensagem do servidor:
    const message = { id: num_id, name: pessoa,  position: position, priority: priority };
    setPeople([...people, message]);
    setPessoa("");
    setPriority(0);
    setPosition("");
  };
  
  return (
    <div className="App">
      <div className="header">
      <button onClick={handleClick} className="bot_para_ter_lista">llista</button>
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Nome"
            name="pessoa"
            value={pessoa}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Cargo:"
            name="position"
            value={position}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Prioridade:"
            name="deadline"
            value={priority}
            onChange={handleChange}
          />
        </div>
        <button onClick={addPessoa}>Add Pessoa</button>
      </div>

      <div className="carrossel">

        <Carousel
          show={1}
          withIndicator
        >
          
          {sortedPeople.map(person => (
           <div key={person.id} className="pessoa">
           <div className="content">
             <table>
               
               <tr>
                 <td> Prioridade: </td>
                 <td> {person.priority} </td>
               </tr>
               
               <tr>
                 <td> <b> Nome:</b> </td>
                 <td> {person.name} </td>
               </tr>
     
               <tr>
                 <td> Cargo: </td>
                 <td> {person.position}   </td>
               </tr>
             </table>
     
           </div>
         </div>
          ))}       

        </Carousel>
        <div className="lista" style={{ display: toggle ? 'none' : 'block' }}>
          <p>Lista:</p>
        {sortedPeople.map(person => (
          <div key={person.id} className="convidaddo_lista">
            <th  className="nome_lista">Nome: {person.name} | Cargo: {person.position}</th>
          </div>
        ))}         
        </div>
      
      </div>
    </div>
  );
}

export default App;
