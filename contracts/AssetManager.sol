pragma solidity ^0.4.24;

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
    
    event AssetAdded(
        address indexed from,
        string name
    );

    mapping(address => User) users;
    mapping(string => Asset) assets;
    string[] assetIds;
    address[] userIds;
    uint8 public assetCount;
    
    function addAsset(string _slug, string _name) public returns(bool) {
        require(compareStrings(assets[_slug].slug, _slug) == false);
        assets[_slug].slug = _slug;
        assets[_slug].name = _name;
        assets[_slug].owner = msg.sender;
        assetIds.push(_slug);
        assetCount += 1;
        emit AssetAdded(msg.sender, _name);
        return true;
    }
    
    function getAsset(uint8 _index) public view returns(string _name, address _owner) {
        string _slug = assetIds[_index];
        return(assets[_slug].name, assets[_slug].owner);
    }
    
    function addHoldingAssets(string _slug) public returns(bool) {
        users[msg.sender].holdingAssets.push(_slug);
        return true;
    }
    
    function getHoldingAssetCount() public view returns(uint256 count) {
        return users[msg.sender].holdingAssets.length;
    }
    
    function getHoldingAssets(uint256 _index) public view returns(string _assets) {
        return users[msg.sender].holdingAssets[_index];
    }
    
    function compareStrings (string _first, string _second) private view returns (bool){
       return keccak256(_first) == keccak256(_second);
    }
}
