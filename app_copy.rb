require 'sinatra'
require 'braintree'
require 'pry'
set :public_folder, 'public'


def gateway
  @gateway = Braintree::Gateway.new(
    :environment => :sandbox,
    :merchant_id => '',
    :public_key => '',
    :private_key => '',
 )
end

get '/' do 
  @client_token = gateway.client_token.generate
  erb :index
end

post '/submit' do
  nonce = params["payment_method_nonce"] #for sinatra integration
  @result = gateway.transaction.sale(
    :amount => "10.00",
    :payment_method_nonce => nonce, 
    :options => {
      :submit_for_settlement => true
    }
  )
  if @result.success?
    @transaction = @result.transaction
    erb :submit
  else
    erb :failure3ds
  end  
end

__END__


@@layout

<!doctype html>
<html lang="en">
<head>
  <title>Braintree Sinatra</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
  <meta charset="utf-8">
 <!--  <script src="https://js.braintreegateway.com/web/3.44.2-beta-3ds.6/js/client.min.js"></script>
  <script src="https://js.braintreegateway.com/web/3.44.2-beta-3ds.6/js/hosted-fields.min.js"></script>
  <script src="https://js.braintreegateway.com/web/3.44.2-beta-3ds.6/js/three-d-secure.min.js"></script> -->
  <script src="https://js.braintreegateway.com/web/3.50.0/js/client.min.js"></script>

<!-- Load the Hosted Fields component.. -->
<script src="https://js.braintreegateway.com/web/3.50.0/js/hosted-fields.min.js"></script>

<!-- Load the 3D Secure component. -->
<script src="https://js.braintreegateway.com/web/3.50.0/js/three-d-secure.min.js"></script>
</head>
<body>
  <header>
    <div class='menu-container'>
      <div class='menu'>
        <div class='logo'>🌮🛑</div>
        <div class='menu'>Menu</div>
        <div class='about'>About</div>
      </div>
    </div>
    <div class="title-container">
      <h1>That Taco Stop</h1>
    </div>
  </header>
  <div>
    <%= yield %>
  <div>
  <div class='3dsecure'></div>
</body>
</html>



@@index
  <div>
  <center><p>Today's special: 4 tacos for $10.00:</p><center>

  <form id="form" action="/submit" method="post">
      <label for="card-number">Card Number</label>
      <div id="card-number"></div>

      <label for="cvv">CVV</label>
      <div id="cvv"></div>

      <label for="expiration-date">Expiration Date</label>
      <div id="expiration-date"></div>

      <input type="hidden" id="nonce" name="payment_method_nonce" />
      <input type="submit" value="Pay" disabled />
  </form> 

  <script>
    var client_token = "<%= @client_token %>";
    var submit = document.querySelector('input[type="submit"]');
    var form = document.querySelector('#form');   
    var threeDSecure;
  </script>
  <script src="app_copy.js" type="text/javascript"></script>



@@submit
  <p> Status: <%= @transaction.status %> </p>
  <p> Amount: $<%= @transaction.amount.to_i %> </p>
  <script src="app_copy.js" type="text/javascript"></script>

@@failure3ds
   <p> "Something went wrong, most likely a 3DS verification problem. Call the damn bank." </p>
  








