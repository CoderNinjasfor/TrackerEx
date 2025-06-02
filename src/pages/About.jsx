import React from 'react'
import TransactionList from '../components/TransactionList';
import TransactionForm from '../components/TransactionForm';

import TransactionModal from '../components/TransactionModal';
import SampleTansList from '../components/sampleTansList';
 const About = () => {
  return (
      <>
         <div className="App">
      <SampleTansList  />
     <TransactionModal/>
    </div>
      </>
  )
}
export default About