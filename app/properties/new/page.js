import React from 'react'

function NewProperty() {
  return (
    <div>
      <h1 className='bg-blue-500 '>Add New Property Form</h1>

      <h2>Property Details</h2>

      <form>
        <label>Title:</label>
        <input type='text'/>

        <label>Description:</label>
        <textarea></textarea>

        <label>Price:</label>
        <input type='number'/>


      </form>
    </div>
  )
}

export default NewProperty
