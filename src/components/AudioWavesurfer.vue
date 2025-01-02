<template>
  <div class="q-ma-sm">
    <a href="https://wavesurfer.xyz/" target="_blank">
      <q-chip clickable color="primary" text-color="white" icon="link">
        Wavesurfer.js
      </q-chip>
    </a>
  </div>
  <div class="q-ma-md">
    <q-card flat bordered >
      <q-card-section>
        <q-btn
          @click="handleRecordClick"
          :label="recordButtonText"
          color="primary"
          :icon="mic"
          rounded
          
        />
        <q-btn
          v-if="isRecording"
          @click="handlePauseClick"
          :label="pauseButtonText"
          color="secondary"
          :icon="recordIcon"
          rounded
          style="margin-left: 1rem;"
        />
      </q-card-section>
      <q-separator inset />
      <q-card-section>
        <div>{{ progress }}</div>
        <div id="mic" style="border: 1px solid #ddd; border-radius: 4px; margin-top: 1rem"></div>
      </q-card-section>
      
    </q-card>

    <q-card flat bordered class="q-mt-md">
      <q-card-section>
        <div id="recordings" style="margin: 1rem 0"></div>
        
      </q-card-section>
    </q-card>
    
    
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import WaveSurfer from 'wavesurfer.js';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.esm.js';

// Define reactive variables
const wavesurfer = ref<WaveSurfer | null>(null);
const record = ref<any>(null);

const scrollingWaveform = ref(false);
const continuousWaveform = ref(true);
const selectedMic = ref('');
const isRecording = ref(false);
const recordButtonText = ref('Record');
const mic = ref('mic');
const pauseButtonText = ref('Pause');
const recordIcon = ref('pause');
const audioDevices = ref<any[]>([]);
const progress = ref('00:00');

// Function to create WaveSurfer instance
const createWaveSurfer = () => {
  // Destroy the previous wavesurfer instance
  if (wavesurfer.value) {
    wavesurfer.value.destroy();
  }

  // Create a new Wavesurfer instance
  wavesurfer.value = WaveSurfer.create({
    container: '#mic',
    waveColor: 'rgb(200, 0, 200)',
    progressColor: 'rgb(100, 0, 100)',
    barWidth: 3,
    barGap: 1,
    barRadius: 2,
  });

  // Initialize the Record plugin
  record.value = wavesurfer.value.registerPlugin(
    RecordPlugin.create({
      renderRecordedAudio: false,
      scrollingWaveform: scrollingWaveform.value,
      continuousWaveform: continuousWaveform.value,
      continuousWaveformDuration: 30, // optional
    })
  );

  // Handle the 'record-end' event
  record.value.on('record-end', (blob: Blob) => {
    const container = document.querySelector('#recordings');
    const recordedUrl = URL.createObjectURL(blob);

    // Create wavesurfer from the recorded audio
    const recordedWaveSurfer = WaveSurfer.create({
      container: container as HTMLElement,
      waveColor: 'rgb(200, 100, 0)',
      progressColor: 'rgb(100, 50, 0)',
      barWidth: 3,
      barGap: 1,
      barRadius: 2,
      url: recordedUrl,
    });

    // Play button
    const button = container?.appendChild(document.createElement('div'));
    button!.classList.add('play-stop-btn');
    button!.innerHTML = '<i class="material-symbols-rounded">play_circle</i><span>Play</span>';
    button!.onclick = () => recordedWaveSurfer.playPause();
    recordedWaveSurfer.on('pause', () => (button!.innerHTML = '<i class="material-symbols-rounded">play_circle</i><span>Play</span>'));
    recordedWaveSurfer.on('play', () => (button!.innerHTML = '<i class="material-symbols-rounded">stop_circle</i><span>Pause</span>'));

    const recordedAudio = container?.appendChild(document.createElement('div'))
    recordedAudio!.classList.add('download-section');
    const link = recordedAudio?.appendChild(document.createElement('a'))
    link!.classList.add('download-btn');
    const recordedAudioContent = link?.appendChild(document.createElement('i'))
    recordedAudioContent!.classList.add('material-symbols-rounded');
    recordedAudioContent!.textContent ='download'
    const downloadLink = link?.appendChild(document.createElement('span'))
    
    Object.assign(downloadLink!, {
      href: recordedUrl,
      download: 'recording.' + blob.type.split(';')[0].split('/')[1] || 'webm',
      textContent:'Download recording'
    })

  });

  // Update progress
  record.value.on('record-progress', (time: number) => {
    updateProgress(time);
  });
};

// Format time to mm:ss
const updateProgress = (time: number) => {
  const formattedTime = [
    Math.floor((time % 3600000) / 60000), // minutes
    Math.floor((time % 60000) / 1000), // seconds
  ]
    .map((v) => (v < 10 ? '0' + v : v))
    .join(':');
  progress.value = formattedTime;
};

// Handle Record button click
const handleRecordClick = () => {
  if (record.value.isRecording() || record.value.isPaused()) {
    record.value.stopRecording();
    recordButtonText.value = 'Record';
    mic.value = 'mic'
    pauseButtonText.value = 'Pause';
    recordIcon.value = 'pause'
    isRecording.value = false;
    return;
  }

  recordButtonText.value = 'Stop';
  mic.value = 'mic_off'
  isRecording.value = true;
  record.value.startRecording({ deviceId: selectedMic.value }).then(() => {
    pauseButtonText.value = 'Pause';
  });
};

// Handle Pause button click
const handlePauseClick = () => {
  if (record.value.isPaused()) {
    record.value.resumeRecording();
    pauseButtonText.value = 'Pause';
    recordIcon.value = 'pause';
  } else {
    record.value.pauseRecording();
    pauseButtonText.value = 'Resume';
    recordIcon.value = 'play_arrow';
  }
};



onMounted(() => {
  // Initialize wavesurfer on mount
  createWaveSurfer();

  // Get available audio devices
  RecordPlugin.getAvailableAudioDevices().then((devices) => {
    audioDevices.value = devices;
  });
});
</script>

<style>
.play-stop-btn {
    display: inline-flex;
    cursor: pointer;
    align-items: center;
}
.play-stop-btn i {
    line-height: 1;
    font-size: 50px;
    color: #1976d2;
}
.play-stop-btn span {
    font-size: 20px;
    margin-left: 5px;
}
.download-section {
    margin-bottom: 20px;
}
a.download-btn {
    display: inline-block;
    font-size: 14px;
    background: teal;
    padding: 5px 10px;
    color: #fff;
    cursor: pointer;
}
a.download-btn i {
    font-size: 20px;
    margin-right: 10px;
}
</style>
