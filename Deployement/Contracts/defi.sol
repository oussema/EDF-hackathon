pragma solidity >= 0.6.0;

contract Defi {
    struct Prod {
        uint amount;
        uint date;
    }
    enum State {Setup, Funding, Production} 
    
    mapping(address=>uint) deposit;
    mapping(address=>uint) interest;
    address[] depositor;
    
    Prod[] prodRegister ;
    
    address public owner;
    address public oracle;
    
    uint public totalDeposit;
    uint public lastTs;
    State public state;

    modifier onlyOwner {
        require (msg.sender == owner, 'Only the owner can call this function');
        _;
    }
    
    modifier onlyOracle {
        require (msg.sender == oracle, 'Only the oracle can call this function');
        _;
    }
    
    modifier onlySender(address sender) {
        require (msg.sender == sender, 'Only the tx sender can call this function');
        _;
    }
    
    modifier duringFunding {
        require (state == State.Funding, 'This action is available only during funding stage');
        _;
    }
    
    modifier duringProduction {
        require (state == State.Production, 'This action is available only during production stage');
        _;
    }

    constructor() public {
        owner = msg.sender;
        oracle = msg.sender;
        totalDeposit = 0;
        state = State.Setup;
        lastTs = 0;
    }

    function changeOwner(address newOwner) public onlyOwner {
        owner = newOwner;
    }
    
    function setOracle(address newOracle) public onlyOwner {
        oracle = newOracle;
    }
    
    function letFinanceIt() public onlyOwner {
        state = State.Funding;
    }
    
    function letProduct() public onlyOwner {
        state = State.Production;
    }
    
    function reinit() public onlyOwner {
        state = State.Setup;
        uint i;
        address addr;
        for (i=0; i<depositor.length; i++) {
            addr = depositor[i];
            deposit[addr] = 0 ;
            interest[addr] = 0;
        }
        totalDeposit = 0;
        lastTs = 0;
    }

    function registerDeposit(address a, uint x) public onlyOwner duringFunding {
        deposit[a] += x;
        totalDeposit += x;
        bool notFound = true;
        uint i;
        for (i=0; i<depositor.length; i++) {
            if (depositor[i] == a) {
                notFound = false ;
            }
        }
        if (notFound) {
            depositor.push(a);
        }
    }
    
    function registerProd(uint prod, uint ts) public onlyOracle duringProduction {
        require (ts > lastTs) ;
        lastTs = ts ;
        prodRegister.push(Prod({amount: prod, date: ts}));
        address addr;
        uint i;
        for (i=0; i<depositor.length; i++) {
            addr = depositor[i];
            interest[addr] += (prod*deposit[addr])/totalDeposit;
        }
    }
    
    function read(address a)  public onlySender(a) returns (uint,uint) {
        return (deposit[a], interest[a]);
    }
}
