import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ],
      filter: '',
      name: '',
      number: '',
    };
  }

  componentDidMount() {
    const storedContacts = localStorage.getItem('contacts');

    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, number, contacts } = this.state;

    // Verificar si el nombre ya está en la lista
    const nameExists = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (nameExists) {
      alert(`The contact ${name} already exists!`);
    } else {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      // Guardar en localStorage
      localStorage.setItem(
        'contacts',
        JSON.stringify([...contacts, newContact])
      );

      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
        name: '',
        number: '',
      }));
    }
  };

  handleTofind = event => {
    const { value } = event.target;
    this.setState({
      filter: value.toLowerCase(),
    });
  };

  handleDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter, name, number } = this.state;

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div>
        <h1 style={{ paddingLeft: '4%' }}>Phonebook</h1>
        <ContactForm
          name={name}
          number={number}
          handleInputChange={this.handleInputChange}
          handleSubmit={this.handleSubmit}
        />

        <h2 style={{ paddingLeft: '4%' }}>Contacts</h2>
        <Filter filter={filter} handleTofind={this.handleTofind} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}

///////////////////////////////////////////////////////// ciclos de vida
// import React, { Component } from 'react';
// import { nanoid } from 'nanoid';

// export class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//     name: '',
//     number: '',
//   };

//   componentDidMount() {
//     // Cargar contactos desde localStorage al montar el componente
//     const savedContacts = localStorage.getItem('contacts');
//     if (savedContacts) {
//       this.setState({ contacts: JSON.parse(savedContacts) });
//     }
//   }

//   componentDidUpdate() {
//     // Guardar contactos en localStorage cada vez que se actualiza el estado
//     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//   }

//   handleInputChange = event => {
//     const { name, value } = event.target;
//     this.setState({
//       [name]: value,
//     });
//   };

//   handleSubmit = event => {
//     event.preventDefault();
//     const { name, number } = this.state;
//     const newContact = {
//       id: nanoid(),
//       name,
//       number,
//     };
//     this.setState(prevState => ({
//       contacts: [...prevState.contacts, newContact],
//       name: '',
//       number: '',
//     }));
//   };

//   handleTofind = event => {
//     const { value } = event.target;
//     this.setState({
//       filter: value,
//     });
//   };

//   render() {
//     const { name, number, contacts, filter } = this.state;

//     const filteredContacts = contacts.filter(contact =>
//       contact.name.toLowerCase().includes(filter.toLowerCase())
//     );

//     return (
//       <div style={{ paddingLeft: '50px' }}>
//         <h1>Phonebook</h1>
//         <form
//           onSubmit={this.handleSubmit}
//           style={{
//             width: '20%',
//           }}
//         >
//           <div
//             style={{ border: 'solid 2px black', padding: '10px 0 10px 10px' }}
//           >
//             <label
//               style={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: '8px',
//               }}
//             >
//               Name
//               <input
//                 style={{ width: '50%' }}
//                 type="text"
//                 name="name"
//                 pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//                 title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//                 placeholder="Name"
//                 required
//                 value={name}
//                 onChange={this.handleInputChange}
//               />
//             </label>
//             <label
//               style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
//             >
//               Number
//               <input
//                 style={{ width: '50%' }}
//                 type="tel"
//                 name="number"
//                 pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//                 title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//                 placeholder="Number"
//                 required
//                 value={number}
//                 onChange={this.handleInputChange}
//               />
//               <button type="submit" style={{ width: '42%' }}>
//                 Add Contact
//               </button>
//             </label>
//           </div>
//           <h1>Contacts</h1>
//           <label>
//             Find contacts by name
//             <input
//               type="text"
//               name="filter"
//               placeholder="To find"
//               value={filter}
//               onChange={this.handleTofind}
//             />
//             {filter ? (
//               <ul>
//                 {filteredContacts.map(contact => (
//                   <li key={contact.id}>
//                     Name: {contact.name}, Number: {contact.number}
//                   </li>
//                 ))}
//               </ul>
//             ) : undefined}
//           </label>
//         </form>
//       </div>
//     );
//   }
// }

///////////////////////////////////////////////////////////  original
// import React, { Component } from 'react';
// import { nanoid } from 'nanoid';

// export class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//     name: '',
//     number: '',
//   };

//   handleInputChange = event => {
//     const { name, value } = event.target;
//     this.setState({
//       [name]: value,
//     });
//   };

//   handleSubmit = event => {
//     event.preventDefault();
//     const { name, number } = this.state;
//     const newContact = {
//       id: nanoid(),
//       name,
//       number,
//     };
//     this.setState(prevState => ({
//       contacts: [...prevState.contacts, newContact],
//       name: '',
//       number: '',
//     }));
//   };

//   handleTofind = event => {
//     const { value } = event.target;
//     this.setState({
//       filter: value,
//     });
//   };

//   render() {
//     const { name, number, contacts, filter } = this.state;

//     const filteredContacts = contacts.filter(contact =>
//       contact.name.toLowerCase().includes(filter.toLowerCase())
//     );

//     return (
//       <div style={{ paddingLeft: '50px' }}>
//         <h1>Phonebook</h1>
//         <form
//           onSubmit={this.handleSubmit}
//           style={{
//             width: '20%',
//           }}
//         >
//           <div
//             style={{ border: 'solid 2px black', padding: '10px 0 10px 10px' }}
//           >
//             <label
//               style={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: '8px',
//               }}
//             >
//               Name
//               <input
//                 style={{ width: '50%' }}
//                 type="text"
//                 name="name"
//                 pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//                 title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//                 placeholder="Name"
//                 required
//                 value={name}
//                 onChange={this.handleInputChange}
//               />
//             </label>
//             <label
//               style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
//             >
//               Number
//               <input
//                 style={{ width: '50%' }}
//                 type="tel"
//                 name="number"
//                 pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//                 title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//                 placeholder="Number"
//                 required
//                 value={number}
//                 onChange={this.handleInputChange}
//               />
//               <button type="submit" style={{ width: '42%' }}>
//                 Add Contact
//               </button>
//             </label>
//           </div>
//           <h1>Contacts</h1>
//           <label>
//             Find contacts by name
//             <input
//               type="text"
//               name="filter"
//               placeholder="To find"
//               value={filter}
//               onChange={this.handleTofind}
//             />
//             {filter ? (
//               <ul>
//                 {filteredContacts.map(contact => (
//                   <li key={contact.id}>
//                     Name: {contact.name}, Number: {contact.number}
//                   </li>
//                 ))}
//               </ul>
//             ) : undefined}
//           </label>
//         </form>
//       </div>
//     );
//   }
// }
