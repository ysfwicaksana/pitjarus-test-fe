<template>
  <div class="container mx-20 my-5">
    <p class="text-lg my-1 font-bold">Reporting</p>
    <div class="flex flex-row gap-5 items-center">
      <select v-model="storeAreaSelected" class="ring-1 ring-black rounded">
        <option value="" disabled selected>Select Area</option>
        <option
          :value="area.area_id"
          v-for="(area, index) in storeArea"
          :key="index"
        >
          {{ area.area_name }}
        </option>
      </select>
      <div class="flex flex-row gap-2">
        <label for="">Date From:</label>
        <input
          type="date"
          v-model="dateFrom"
          placeholder="Date From"
          class="rounded ring-1 ring-black"
        />
      </div>
      <div class="flex flex-row gap-2">
        <label for="">Date To:</label>
        <input
          type="date"
          v-model="dateTo"
          placeholder="Date To"
          class="rounded ring-1 ring-black"
        />
      </div>
      <button
        class="bg-green-500 rounded text-white p-1 font-semibold"
        @click="generateReport"
      >
        View
      </button>
    </div>

    <div class="my-5 flex flex-row gap-4 items-center">
      <Chart
        :size="{ width: 500, height: 400 }"
        :data="chartData"
        :margin="margin"
        direction="horizontal"
      >
        <template #layers>
          <Grid strokeDasharray="2,2" />
          <Bar
            :dataKeys="['area_name', 'percentage']"
            :barStyle="{ fill: '#90e0ef' }"
          />
        </template>
      </Chart>

      <table
        v-if="chartData.length > 0"
        class="table-auto border-collapse border-red-500"
      >
        <thead>
          <tr>
            <th class="bg-blue-300 border text-left px-2 py-1">Area Name</th>
            <th class="bg-blue-300 border text-left px-2 py-1">Percentage</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(chart, index) in chartData" :key="index">
            <td class="border px-2 py-1">{{ chart.area_name }}</td>
            <td class="border px-2 py-1">{{ chart.percentage }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <table
      v-if="tableData.length > 0"
      class="table-auto border-collapse border-red-500"
    >
      <thead>
        <tr>
          <th class="bg-blue-300 border text-left px-2 py-1">Brand Name</th>
          <th class="bg-blue-300 border text-left px-2 py-1">Jakarta</th>
          <th class="bg-blue-300 border text-left px-2 py-1">Jawa Barat</th>
          <th class="bg-blue-300 border text-left px-2 py-1">Kalimantan</th>
          <th class="bg-blue-300 border text-left px-2 py-1">Jawa Tengah</th>
          <th class="bg-blue-300 border text-left px-2 py-1">Bali</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(table, index) in tableData" :key="index">
          <td class="border px-2 py-1">{{ table.brand_name }}</td>
          <td class="border px-2 py-1">{{ table.jakarta }}</td>
          <td class="border px-2 py-1">{{ table.jawa_barat }}</td>
          <td class="border px-2 py-1">{{ table.kalimantan }}</td>
          <td class="border px-2 py-1">{{ table.jawa_tengah }}</td>
          <td class="border px-2 py-1">{{ table.bali }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { getStoreArea } from "./services/backend/storeArea";
import { report } from "./services/backend/report";
import { Chart, Grid, Bar } from "vue3-charts";

export default {
  components: { Chart, Grid, Bar },

  setup() {
    const storeArea = ref([]);
    const storeAreaSelected = ref("");
    const dateFrom = ref("");
    const dateTo = ref("");
    const tableData = ref([]);
    const chartData = ref([]);
    const margin = ref({});

    onMounted(async () => {
      storeArea.value = await getStoreArea();
    });

    const generateReport = async () => {
      let payload = {
        area: storeAreaSelected.value,
        dateFrom: dateFrom.value,
        dateTo: dateTo.value,
      };

      const result = await report(payload);

      const { chart, table } = result;
      margin.value = ref({
        left: 0,
        top: 20,
        right: 20,
        bottom: 0,
      });

      chartData.value = chart;

      tableData.value = table;
      // const
    };

    return {
      storeArea,
      storeAreaSelected,
      dateFrom,
      dateTo,
      generateReport,
      tableData,
      chartData,
      margin,
    };
  },
};
</script>
