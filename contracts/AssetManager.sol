pragma solidity ^0.4.6;

contract AssetManager {

    struct Asset {
        string slug; 
        string name; 
        address owner;
    }

    struct User {
        string name;
        string[] holdingAssets;
    }
    
    mapping(address => User) users;
    mapping(string => Asset) assets;
    string[] assetIds;
    address[] userIds;
    
    function addAsset(string slug, string name) public returns(bool success) {
        assets[slug].slug = slug;
        assets[slug].name = name;
        assets[slug].owner = msg.sender;
        assetIds.push(slug);
        return true;
    }
    
    function getAsset(string slug) public view returns(string name, address owner) {
        return(assets[slug].name, assets[slug].owner);
    }
    
    function addHoldingAssets(string slug) public returns(bool success) {
        users[msg.sender].holdingAssets.push(slug);
        return true;
    }
    
    function getHoldingAssetCount() public view returns(uint256 count) {
        return users[msg.sender].holdingAssets.length;
    }
    
    function getHoldingAssets(uint256 index) public view returns(string _assets) {
        return users[msg.sender].holdingAssets[index];
    }
}
