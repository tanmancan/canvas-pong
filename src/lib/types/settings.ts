export interface BallSettings {
  readonly Speed: number;
  readonly SpeedModifier: number;
  readonly Radius: number;
  readonly Color: string;
}

interface AiPaddleSettings {
  readonly Name: string;
  readonly Color: string;
  readonly Handicap: number;
  readonly TrackingThreshold: number;
}

interface PlayerPaddleSettings {
  readonly Name: string;
  readonly Color: string;
}

export interface PaddleSettings {
  readonly Speed: number;
  readonly Width: number;
  readonly Height: number;
  readonly Color: string;
  readonly AiPaddleSettings: AiPaddleSettings;
  readonly PlayerPaddleSettings: PlayerPaddleSettings;
}

interface NewGameButtonSettings {
  readonly Label: string;
  readonly LabelColor: string;
  readonly ButtonColor: string;
  readonly Height: number;
}

export interface GameBoardSettings {
  readonly MuteAudio: boolean,
  readonly WinningScore: number;
  readonly TextColor: string;
  readonly BoardBackground: string;
  readonly OutOfBoundsBackground: string;
  readonly PaddleHitBackground: string;
  readonly NewGameButtonSettings: NewGameButtonSettings;
}

export interface SettingsModel {
  readonly BallSettings: BallSettings;
  readonly PaddleSettings: PaddleSettings;
  readonly GameBoardSettings: GameBoardSettings;
}
