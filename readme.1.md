Setup:

From terminal, cd into the main directory of app.rb

In terminal, run the following commands to install the necessary ruby gems:

gem install sinatra
gem install braintree
gem install shotgun

open app_copy.rb in your IDE and enter your Braintree Credentials:

def gateway
  @gateway = Braintree::Gateway.new(
    :environment => :sandbox,
    :merchant_id => 'HERE',
    :public_key => 'HERE',
    :private_key => 'AND HERE',
 )
end

To run: 

shotgun app_copy.rb
