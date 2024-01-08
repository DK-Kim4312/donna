import React from 'react';
import styles from '../styles/UpgradeToPremium.module.css';

const UpgradeToPremium = () => {
  const premiumPlans = [
    {
      id: 1,
      name: 'Basic Plan',
      price: '$9.99/month',
      description: 'Unlock basic premium features',
    },
    {
      id: 2,
      name: 'Pro Plan',
      price: '$19.99/month',
      description: 'Unlock advanced premium features',
    },
    {
      id: 3,
      name: 'Ultimate Plan',
      price: '$29.99/month',
      description: 'Unlock all premium features',
    },
  ];

  return (
    <div className={styles["upgrade-to-premium"]}>
      <h2>Upgrade to Premium</h2>
      <div className={styles["premium-options"]}>
        {premiumPlans.map((plan) => (
          <div className={styles["premium-plan"]} key={plan.id}>
            <h3>{plan.name}</h3>
            <p>{plan.description}</p>
            <p>{plan.price}</p>
            <button className={styles["upgrade-button"]}>Upgrade Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpgradeToPremium;