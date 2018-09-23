import * as React from "react";
import { ToolTipHdr, ToolTipItalic } from "./styledComponents";

// Text for reviewing a vote to commit
export const CommitVoteReviewButtonText: React.SFC = props => <>Review My Vote</>;

// Text for whitelisting action. Used in buttons and calls to action
export const WhitelistActionText: React.SFC = props => <>accepted</>;

// Text for removing action. Used in buttons and calls to action
export const RemoveActionText: React.SFC = props => <>removed</>;

// Call to action text. Used on Commit Vote form
export interface VoteCallToActionTextProps {
  newsroomName?: string;
}

export const VoteCallToActionText: React.SFC<VoteCallToActionTextProps> = props => {
  return (
    <>
      Should {props.newsroomName || "this newsroom"} be{" "}
      <b>
        <WhitelistActionText />
      </b>{" "}
      or{" "}
      <b>
        <RemoveActionText />
      </b>{" "}
      from the Civil Registry?
    </>
  );
};

// Label for Commit Vote num tokens form
export const CommitVoteNumTokensLabelText: React.SFC = props => {
  return <>Enter amount of tokens to vote. 1 vote equals 1 token </>;
};

// Commit Vote callouts
export const CommitVoteCalloutHeaderText: React.SFC = props => {
  return <>Submit Your Votes!</>;
};

export const CommitVoteCalloutCopyText: React.SFC = props => {
  return <>Submit your vote with your CVL tokens, and help curate credible, trustworthy journalism on Civil.</>;
};

export const CommitVoteAlreadyVotedHeaderText: React.SFC = props => {
  return <>Thanks for participating in this challenge!</>;
};

export const CommitVoteAlreadyVotedCopyText: React.SFC = props => {
  return (
    <>You have committed a vote in this challenge. Thanks for that. You can change your vote until the deadline.</>
  );
};

export const CommitVoteCalloutButtonText: React.SFC = props => <>Submit My Vote</>;

// Reveal Vote
export const RevealVoteButtonText: React.SFC = props => <>Reveal My Vote</>;

// Phase Card Display Names
export const UnderChallengePhaseDisplayNameText: React.SFC = props => <>Under Challenge</>;

export const ReadyToCompletePhaseDisplayNameText: React.SFC = props => <>Ready to Complete</>;

export const NewApplicationDisplayNameText: React.SFC = props => <>New Application</>;

export const RejectedNewroomDisplayNameText: React.SFC = props => <>Rejected Newroom</>;

export const WhitelistedNewroomsDisplayNameText: React.SFC = props => <>Approved Newroom</>;

// Tooltips
export interface ToolTipTextProps {
  phaseLength?: number;
}

export const DurationToolTipText: React.SFC<ToolTipTextProps> = props => {
  const days = props.phaseLength! / 86400;
  const duration = days <= 1 ? days + " day" : days + " days";
  return <>Time duration: {duration}</>;
};

export const NewApplicationToolTipText: React.SFC<ToolTipTextProps> = props => {
  return (
    <>
      <ToolTipHdr>Under review by the community</ToolTipHdr>
      <ToolTipItalic>
        <DurationToolTipText phaseLength={props.phaseLength} />
      </ToolTipItalic>
      <p>
        CVL token holders may challenge a Newsroom if their mission, charter, or roster is perceived to misalign with
        the Civil Constitution. Newsroom will be approved if there are no challenges.
      </p>
    </>
  );
};

export const UnderChallengeToolTipText: React.SFC<ToolTipTextProps> = props => {
  return (
    <>
      <ToolTipHdr>A CVL token holder is challenging this newsroom</ToolTipHdr>
      <p>
        This Newsroom is being challenged by a CVL token holder who believes it violates one of principles outlined in
        the Civil Constitution. Read the challenger's statement in the Discussion section.
      </p>
      <p>The challenge phase consists of 3 subphases: Commit vote, Confirm vote, and Request an Appeal.</p>
    </>
  );
};

export const WhitelistedNewroomsToolTipText: React.SFC = props => {
  return (
    <>
      <p>
        This Newsroom has been approved to be on the Civil Registry, on condition they commit to uphold the values of
        the Civil Constitution.
      </p>
      <p>
        CVL token holders are the stewards of ethical journalism on the Civil Registry. If for any reason you believe
        that a Newsroom has violated either the Civil Constitution or the Newsroom's own stated mission and charter, you
        may challenge them at any time.
      </p>
    </>
  );
};

export const RejectedNewsroomsToolTipText: React.SFC = props => {
  return (
    <>
      <p>
        This Newsroom has been rejected by the CVL token-holding community due to misalignment with the Civil
        Constitution.
      </p>
      <p>Rejected Newsrooms may reapply to the Civil Registry at any time.</p>
    </>
  );
};

export const ResolveChallengeToolTipText: React.SFC = props => {
  return (
    <>
      <ToolTipHdr>Resolve Challenge</ToolTipHdr>
      <p>
        Challenge results are in, and any CVL token holder may resolve this challenge. When this is resolved, Newsroom
        will be listed or delisted from The Civil Registry. Please note that this requires paying some Ethereum gas to
        complete.
      </p>
    </>
  );
};

export const CommitVoteToolTipText: React.SFC<ToolTipTextProps> = props => {
  return (
    <>
      <ToolTipHdr>Commit tokens to cast a secret vote</ToolTipHdr>
      <ToolTipItalic>
        <DurationToolTipText phaseLength={props.phaseLength} />
      </ToolTipItalic>
      <p>
        Decide how many tokens you would like to put towards this vote. Note that the more tokens you include, the more
        power your vote carries. You can never lose your vote, but you will not be able to withdraw them until the end
        of the voting process. All votes will be hidden, using a secret phrase, until the end of the voting period. You
        have to come back and confirm your vote for it to count.
      </p>
    </>
  );
};

export const ConfirmVoteToolTipText: React.SFC<ToolTipTextProps> = props => {
  return (
    <>
      <ToolTipHdr>Finalize vote using secret ph rase</ToolTipHdr>
      <ToolTipItalic>
        <DurationToolTipText phaseLength={props.phaseLength} />
      </ToolTipItalic>
      <p>
        Voters must enter the secret phrase they received during the commit vote stage of the process in order to
        confirm their vote. Votes can not be counted and rewards can not be claimed unless voters confirm their earlier
        vote.
      </p>
    </>
  );
};

export const RewardPoolToolTipText: React.SFC = props => {
  return (
    <>
      Amount of tokens to be distributed to voters of the winning party at the conclusion of the challenge. The amount
      comes from 50% of the challenger or Newsroom's deposit.
    </>
  );
};

export const DepositsToolTipText: React.SFC = props => {
  return (
    <>
      Amount of CVL tokens staked by the Newsroom when they apply to The Civil Registry, and by the Challenger upon
      challenging this Newsroom.
    </>
  );
};

export const RequestAppealToolTipText: React.SFC<ToolTipTextProps> = props => {
  return (
    <>
      <ToolTipItalic>
        <DurationToolTipText phaseLength={props.phaseLength} />
      </ToolTipItalic>
      <p>
        CVL token holders, (including newsrooms or challengers) can appeal a vote outcome if they believe it is not in
        keeping with the Civil Constitution. This system of checks and balances ensures that all voices and perspectives
        have an opportunity to be heard in the Civil community.
      </p>
    </>
  );
};

export const WaitingCouncilDecisionToolTipText: React.SFC<ToolTipTextProps> = props => {
  return (
    <>
      <ToolTipItalic>
        <DurationToolTipText phaseLength={props.phaseLength} />
      </ToolTipItalic>
      <p>
        After The Civil Council reaches a decision on the appeal, they will publish a document explaining their choice
        and citing the section of the Civil Constitution they used to reach their decision. This system of checks and
        balances ensures that all voices and views have an opportunity to be heard in the Civil community.
      </p>
    </>
  );
};

export const ChallangeCouncilToolTipText: React.SFC<ToolTipTextProps> = props => {
  return (
    <>
      <ToolTipItalic>
        <DurationToolTipText phaseLength={props.phaseLength} />
      </ToolTipItalic>
      <p>
        The challenger must submit a statement with evidence to make their case, and deposit CVL tokens equal to the
        amount of the Newsroom's deposit. The CVL token deposit for the challenge is set aside for the duration of the
        challenge process, like an escrow account.
      </p>
    </>
  );
};