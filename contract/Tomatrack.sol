// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// creating tomatrack contract
contract Tomatrack{

    // creating product struct
    struct Product{
        uint256 id;
        string dateOfHarvest;
        uint256 quantity;
        uint256 price;
        string variety;
        address payable owner;
    }

    // create products as instance of Product
    mapping(uint256 => Product[]) productsOfId;

    // create a ProductCreated event
    event ProductCreated(uint256 id, uint256 quantity, uint256 price, string dateOfHarvest, string variety, address owner );

    // create ProductPurchased event
    event ProductPurchased(uint256 indexed id, address _seller, uint256 _price);

    //function to add new product
    function addProduct(uint256 _id, string memory _dateOfHarvest, uint256 _quantity, string memory _variety, address payable _owner ) public {
        // save Product as newProduct to memory
        Product memory newProduct;

        //  assign values to properties of newProduct
        newProduct.id = _id;
        newProduct.dateOfHarvest = _dateOfHarvest;
        newProduct.quantity = _quantity;
        newProduct.price = 0.1 ether;
        newProduct.variety = _variety;
        newProduct.owner = _owner;

        // push newProduct to productsOfId
        productsOfId[_id].push(newProduct);

        // emit ProductCreadted event
        emit ProductCreated(_id, _quantity, newProduct.price, _dateOfHarvest, _variety, _owner);
    }

    // funtion to get product by _id
    function getProduct(uint256 _id) view public returns( uint256, uint256, string memory, string memory) {
        Product memory prod = productsOfId[_id][0];
        return(prod.id, prod.price, prod.variety, prod.dateOfHarvest);
    }


    // function to buy product
    function buyProduct(uint256 _id) payable public returns(bool){
        emit ProductPurchased(productsOfId[_id][0].id, msg.sender, productsOfId[_id][0].price);
        (bool sent,)=payable(productsOfId[_id][0].owner).call{value: productsOfId[_id][0].price}("");
        return sent;
    }
}