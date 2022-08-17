import Image from 'next/future/image';

import { Spinner } from '../../components/animation/Spinner';
import { CopyButton } from '../../components/buttons/CopyButton';
import { ChainIcon } from '../../components/icons/ChainIcon';
import { ChainToChain } from '../../components/icons/ChainToChain';
import { HelpIcon } from '../../components/icons/HelpIcon';
import { Card } from '../../components/layout/Card';
import CheckmarkIcon from '../../images/icons/checkmark-circle.svg';
import XCircleIcon from '../../images/icons/x-circle.svg';
import { MOCK_MESSAGES } from '../../test/mockMessages';
import { MessageStatus } from '../../types';
import { getHumanReadableTimeString } from '../../utils/time';

export function MessageDetails({ messageId }: { messageId: string }) {
  const {
    status,
    body,
    sender,
    recipient,
    originTimeSent,
    originChainId,
    destinationChainId,
    originTransaction,
    destinationTransaction,
  } = MOCK_MESSAGES[0];

  return (
    <>
      <div className="flex items-center justify-between px-1 -mt-1">
        <h2 className="text-white text-lg">Message</h2>
        {status === MessageStatus.Pending && (
          <div className="text-white text-lg">Status: Pending</div>
        )}
        {status === MessageStatus.Delivered && (
          <div className="flex items-center">
            <div className="text-white text-lg mr-2">Status: Delivered</div>
            <Image src={CheckmarkIcon} alt="checkmark" width={24} height={24} />
          </div>
        )}
        {status === MessageStatus.Failing && (
          <div className="flex items-center">
            <div className="text-white text-lg mr-3">Status: Failing</div>
            <Image src={XCircleIcon} alt="failure" width={30} height={30} />
          </div>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-between mt-5 gap-4">
        <Card classes="flex-1 min-w-fit space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative -top-px -left-0.5">
              <ChainIcon chainId={originChainId} />
            </div>
            <div className="flex items-center pb-1">
              <h3 className="text-gray-500 font-medium text-md mr-2">
                Origin Transaction
              </h3>
              <HelpIcon size={16} text={helpText.origin} />
            </div>
          </div>
          <ValueRow
            label="Tx hash:"
            labelWidth="w-16"
            display={originTransaction.transactionHash}
            displayWidth="w-44 sm:w-56"
            showCopy={true}
          />
          <ValueRow
            label="From:"
            labelWidth="w-16"
            display={originTransaction.from}
            displayWidth="w-44 sm:w-56"
            showCopy={true}
          />
          <ValueRow
            label="Block:"
            labelWidth="w-16"
            display={`${
              originTransaction.blockNumber
            } (${getHumanReadableTimeString(originTimeSent)})`}
            displayWidth="w-44 sm:w-56"
          />
          <a
            className="block text-sm text-gray-500 pl-px underline"
            href="TODO"
            target="_blank"
            rel="noopener noreferrer"
          >
            View in block explorer
          </a>
        </Card>
        <Card classes="flex-1 min-w-fit space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative -top-px -left-0.5">
              <ChainIcon chainId={destinationChainId} />
            </div>
            <div className="flex items-center pb-1">
              <h3 className="text-gray-500 font-medium text-md mr-2">
                Destination Transaction
              </h3>
              <HelpIcon size={16} text={helpText.destination} />
            </div>
          </div>
          {destinationTransaction ? (
            <>
              <ValueRow
                label="Tx hash:"
                labelWidth="w-16"
                display={originTransaction.transactionHash}
                displayWidth="w-44 sm:w-56"
                showCopy={true}
              />
              <ValueRow
                label="From:"
                labelWidth="w-16"
                display={originTransaction.from}
                displayWidth="w-44 sm:w-56"
                showCopy={true}
              />
              <ValueRow
                label="Block:"
                labelWidth="w-16"
                display={`${
                  originTransaction.blockNumber
                } (${getHumanReadableTimeString(originTimeSent)})`}
                displayWidth="w-44 sm:w-56"
              />
              <a
                className="block text-sm text-gray-500 pl-px underline"
                href="TODO"
                target="_blank"
                rel="noopener noreferrer"
              >
                View in block explorer
              </a>
            </>
          ) : (
            <div className="flex flex-col items-center py-6">
              <div className="text-gray-500">
                {status === MessageStatus.Failing
                  ? 'Destination chain transaction currently failing'
                  : 'Destination chain transaction still in progress'}
              </div>
              <Spinner classes="mt-4" />
            </div>
          )}
        </Card>
      </div>
      <Card classes="mt-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="relative -top-px -left-0.5">
            <ChainToChain
              originChainId={originChainId}
              destinationChainId={destinationChainId}
            />
          </div>
          <div className="flex items-center pb-1">
            <h3 className="text-gray-500 font-medium text-md mr-2">
              Message Details
            </h3>
            <HelpIcon size={16} text={helpText.details} />
          </div>
        </div>
        <ValueRow
          label="Sender to outbox:"
          labelWidth="w-24 sm:w-36"
          display={sender}
          displayWidth="w-48 sm:w-80"
          showCopy={true}
        />
        <ValueRow
          label="Recipient from outbox:"
          labelWidth="w-24 sm:w-36"
          display={recipient}
          displayWidth="w-48 sm:w-80"
          showCopy={true}
        />
        <div>
          <label className="text-sm text-gray-500">Message content:</label>
          <div className="relative max-w-full break-words py-2 pl-2 pr-9 mt-2 bg-gray-100 text-sm font-mono rounded">
            {body}
            <CopyButton
              copyValue={body}
              width={15}
              height={15}
              classes="absolute top-2 right-2 opacity-70"
            />
          </div>
        </div>
      </Card>
    </>
  );
}

function ValueRow({
  label,
  labelWidth,
  display,
  displayWidth,
  showCopy,
}: {
  label: string;
  labelWidth: string;
  display: string;
  displayWidth: string;
  showCopy?: boolean;
}) {
  return (
    <div className="flex items-center pl-px">
      <label className={`text-sm text-gray-500 ${labelWidth}`}>{label}</label>
      <span className={`text-sm ml-2 truncate ${displayWidth}`}>{display}</span>
      {showCopy && (
        <CopyButton
          copyValue={display}
          width={15}
          height={15}
          classes="ml-3 opacity-50"
        />
      )}
    </div>
  );
}

const helpText = {
  origin:
    'Info about the transaction that initiated the message placement into the outbox.',
  destination:
    'Info about the transaction that triggered the delivery of the message from an inbox.',
  details:
    'Immutable information about the message itself such as its contents.',
};