import React from 'react'
import styles from "../style"
import "../index.css"

const Dashboard = () => {
  return (
    <div className='bg-primary w-full overflow-hidden h-screen'>

      <div className={`${styles.flexCenter} flex flex-col`}>
        <h2 className={`${styles.subheading} max-w-[470px] md:pt-10 pt-5`}>
          Welcome to Inventory Management Tool
        </h2>
        
      </div>
    </div>
  )
}

export default Dashboard
