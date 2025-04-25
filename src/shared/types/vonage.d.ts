import { Vonage } from '@opentok/client';
import { ScreenShare } from "@vonage/screen-share/src/ScreenShare";

declare global {
	namespace JSX {
		interface IntrinsicElements {
			"video-publisher": VonageWebComponentProps;
			"video-subscriber": VonageWebComponentProps;
			"screen-share": ScreenShare;
		}
	}

	interface VonageWebComponentProps {
		id: string;
		width: string;
		height: string;
		ref: React.RefObject<VonageWebComponentProps>;
		token?: string;
		session?: Vonage.Session;
		toggleVideo?: () => void;
		toggleAudio?: () => void;
	}

	interface HTMLElement {
		session: Vonage.Session;
		stream: Vonage.Stream;
	}

	interface IScreenShare {
		session: Vonage.Session;
		token: string;
		isSharing: boolean;
		__handleStopScreenshare: () => void;
		__handleStartScreenshare: () => void;
	}

}
