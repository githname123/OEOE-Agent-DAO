// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title OEOE Agent DAO - 社区自治合约
 * @author OEOE Community DAO
 * @notice 无项目方、纯社区自治的 DAO 合约
 */
contract OEOEAgentDAO {
    
    // 社区金库
    address public treasury;
    
    // 提案计数器
    uint256 public proposalCount;
    
    // 分红比例 (40% 给持币者)
    uint256 public constant DIVIDEND_RATE = 4000; // 40% * 10000
    
    // 提案结构
    struct Proposal {
        uint256 id;
        string description;
        uint256 votesFor;
        uint256 votesAgainst;
        bool executed;
        uint256 deadline;
        mapping(address => bool) hasVoted;
    }
    
    // 持币者记录
    mapping(address => bool) public isHolder;
    mapping(address => uint256) public holderBalance;
    
    // 提案存储
    mapping(uint256 => Proposal) public proposals;
    
    // 事件
    event ProposalCreated(uint256 indexed proposalId, string description);
    event VoteCast(uint256 indexed proposalId, address voter, bool support);
    event DividendDistributed(address indexed holder, uint256 amount);
    event PaymentReceived(address indexed from, uint256 amount);
    
    constructor() {
        treasury = msg.sender;
    }
    
    /**
     * @notice 创建提案
     * @param _description 提案描述
     */
    function createProposal(string memory _description) external returns (uint256) {
        proposalCount++;
        Proposal storage proposal = proposals[proposalCount];
        proposal.id = proposalCount;
        proposal.description = _description;
        proposal.deadline = block.timestamp + 7 days;
        
        emit ProposalCreated(proposalCount, _description);
        return proposalCount;
    }
    
    /**
     * @notice 投票
     * @param _proposalId 提案 ID
     * @param _support 支持 (true) 或反对 (false)
     */
    function vote(uint256 _proposalId, bool _support) external {
        require(_proposalId <= proposalCount, "Proposal not exists");
        Proposal storage proposal = proposals[_proposalId];
        require(!proposal.hasVoted[msg.sender], "Already voted");
        require(block.timestamp < proposal.deadline, "Voting ended");
        
        proposal.hasVoted[msg.sender] = true;
        
        if (_support) {
            proposal.votesFor++;
        } else {
            proposal.votesAgainst++;
        }
        
        emit VoteCast(_proposalId, msg.sender, _support);
    }
    
    /**
     * @notice 接收支付 (x402 集成)
     */
    receive() external payable {
        emit PaymentReceived(msg.sender, msg.value);
    }
    
    /**
     * @notice 分红给持币者
     * @param _holders 持币者地址列表
     * @param _amounts 分红金额列表
     */
    function distributeDividends(address[] calldata _holders, uint256[] calldata _amounts) external {
        require(msg.sender == treasury, "Only treasury");
        require(_holders.length == _amounts.length, "Length mismatch");
        
        for (uint256 i = 0; i < _holders.length; i++) {
            isHolder[_holders[i]] = true;
            holderBalance[_holders[i]] += _amounts[i];
            
            (bool success, ) = _holders[i].call{value: _amounts[i]}("");
            if (success) {
                emit DividendDistributed(_holders[i], _amounts[i]);
            }
        }
    }
    
    /**
     * @notice 获取提案详情
     */
    function getProposal(uint256 _proposalId) external view returns (
        uint256 id,
        string memory description,
        uint256 votesFor,
        uint256 votesAgainst,
        bool executed,
        uint256 deadline
    ) {
        Proposal storage proposal = proposals[_proposalId];
        return (
            proposal.id,
            proposal.description,
            proposal.votesFor,
            proposal.votesAgainst,
            proposal.executed,
            proposal.deadline
        );
    }
}
