@standard
Feature: Sauce Demo website

 Scenario: Standard user logs in, manages cart, and logs out

    Given the user navigates to the Sauce Demo login page

     When the user logs in with username "standard_user" and password "secret_sauce"
      And the user adds "Sauce Labs Backpack" product to the cart
      And the user adds "Sauce Labs Fleece Jacket" product to the cart
     Then the cart should contain "Sauce Labs Backpack" product
      And the cart should contain "Sauce Labs Fleece Jacket" product

     When the user removes "Sauce Labs Fleece Jacket" product from the cart
      And the user opens the menu
      And the user resets the app state
      And the user logs out
     Then the user should be redirected to the login page