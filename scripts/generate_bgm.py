import math
import wave
import struct
import os

output_path = "C:/Users/user/Documents/ChatGPT/New project/remotion-shorts/public/bgm.wav"

sample_rate = 44100
duration = 24.5
total_samples = int(sample_rate * duration)

bpm = 120
beat_sec = 60.0 / bpm

notes = {
    'C3': 130.81, 'E3': 164.81, 'G3': 196.00, 'B3': 246.94,
    'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
    'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'G5': 783.99, 'A5': 880.00
}

chords = [
    ['C4', 'E4', 'G4', 'C5'],
    ['G3', 'B3', 'D4', 'G4'],
    ['A3', 'C4', 'E4', 'A4'],
    ['F3', 'A3', 'C4', 'F4'],
]

with wave.open(output_path, 'w') as wav:
    wav.setnchannels(2)
    wav.setsampwidth(2)
    wav.setframerate(sample_rate)
    
    frames = bytearray()
    for i in range(total_samples):
        t = i / sample_rate
        beat_idx = int(t / (beat_sec * 0.5))
        chord_idx = int(t / (beat_sec * 4)) % len(chords)
        current_chord = chords[chord_idx]
        
        arp_note_name = current_chord[beat_idx % 4]
        freq = notes.get(arp_note_name, 440.0)
        
        note_t = (t % (beat_sec * 0.5))
        env = math.exp(-note_t * 12.0)
        
        val = 0.5 * math.sin(2 * math.pi * freq * t) + 0.25 * math.sin(4 * math.pi * freq * t) + 0.1 * math.sin(6 * math.pi * freq * t)
        val *= env
        
        bass_t = (t % (beat_sec * 2))
        bass_env = math.exp(-bass_t * 5.0)
        bass_freq = notes.get(current_chord[0], 130.0) / 2.0
        bass_val = 0.3 * math.sin(2 * math.pi * bass_freq * t) * bass_env
        
        sample_val = (val * 0.65 + bass_val * 0.35)
        
        if t > duration - 1.5:
            fade = (duration - t) / 1.5
            sample_val *= max(0.0, fade)
            
        sample_int = int(max(min(sample_val, 1.0), -1.0) * 28000)
        frames.extend(struct.pack('<hh', sample_int, sample_int))
        
    wav.writeframes(frames)

print("BGM wave generated successfully at:", output_path)
