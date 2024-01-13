import React from 'react';
import css from './ContactListItem.module.css';

const ContactListItem = ({ contact, onDeleteContact }) => {
  const { id, name, number } = contact;

  return (
    <li className={css.li_ContactForm}>
      Name: {name}, Number: {number}
      <button className={css.Btn} onClick={() => onDeleteContact(id)}>
        Delete
      </button>
    </li>
  );
};

export default ContactListItem;
