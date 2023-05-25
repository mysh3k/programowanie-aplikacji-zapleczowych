# Interconnected Apps for Seamless Shopping Experience
Welcome to our GitHub project! In this repository, we have developed three interconnected applications that work together to provide a seamless shopping experience. Let's take a closer look at each of these apps and how they contribute to the overall functionality.

## 1) Shop API
The Shop API serves as the backbone of our project, providing the frontend with all the necessary data. Built using the powerful Django Rest Framework, this API communicates with various endpoints to retrieve information about products, inventory, user details, and more. It acts as the intermediary between the frontend and the Payment API, allowing smooth data flow between the two.

## 1) Payment API
The Payment API, also developed using Django Rest Framework, handles all the payment-related functionalities. When a user initiates a payment, this API securely processes the transaction and communicates with the necessary payment gateways or providers. Once the payment is successfully completed, the Payment API informs the Shop API about the payment status, ensuring proper order fulfillment and updating the relevant data.

## 1) Front-end
The Front-end of our project is built using React.js along with the powerful libraries @tanstack/React-Query and React-Router-Dom. This combination allows us to create a dynamic and responsive user interface that interacts with both the Shop API and the Payment API. The frontend displays data from both APIs, providing users with an intuitive and visually appealing shopping experience.

By integrating these three applications, we have created a comprehensive e-commerce solution that seamlessly connects the frontend, the Shop API, and the Payment API. Our project aims to provide a reliable and user-friendly platform for online shopping, ensuring smooth transactions and an engaging user experience.
