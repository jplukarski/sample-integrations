# Sample Integrations

A repo with a variety of Braintree Integrations.

## 3DS Drop-in PHP

A 3DS integration using the Braintree PHP server SDK and the Braintree-Web Drop-in

### Starting the App

If you have composer installed globally:

    ```bash
        make
    ```

This should start the app on port 3000. You do not have to do anything else

If you do not have composer installed globally, install composer within the example directory. You can find instructions on how to install composer [on composer's site](https://getcomposer.org/download/).

1. Run composer:
    If you installed composer within the example directory

    ```bash
        make install_locally
    ```

    You can also install the dependencies if you have composer installed globally without starting the app:
    ```bash
        make install
    ```

2. Start the app:
    ```bash
        make start
    ```

## Hosted Fields w/ PayPal NODE

A Hosted Fields integration that also renders the PayPal smart button, using the Node SDK.

### Starting the App

1. Install dependencies and start the app:
    ```bash
        make
    ```

2. If you only want to install the dependencies:
    ```bash
        make install
    ```

3. Starting the app without installing dependencies
    ```bash
        make start
    ```

A Repository with various sample Braintree integrations for testing. Checkout a branch to view a different integration:
 * 3ds_dropin_php
 * flask_example
 * spring_example
 * express_example
 * graphql_react
 * hosted_fields_3ds_node
 * joes_donut_shop
 * react_integration
 * sinatra_3ds