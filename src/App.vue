<template>
	<div id="wrapper">
		<img src="@/assets/logo.png" alt="Moja Aplikacija, Vue logo"> 
		
		<div id="header">
			<h1> Naila Zukanović </h1>
			<h2> Moja aplikacija </h2>
			<p> Lista studenata, brisanje, uredjivanje i kreiranje istih. </p>
		</div>

		<create-student v-if="!selectedStudent" @create-student="onStudentCreate" />

		<single-student 
			v-if="selectedStudent"
			:student="selectedStudent" 
			@close="onStudentSelected(null)" 
			@delete-student="onStudentDeleted"
		/>

		<students-list :students="students" @select-student="onStudentSelected" />
	</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import { IStudent, IStudentStatus } from '@/interfaces';

import CreateStudent from '@/components/CreateStudent.vue';
import StudentsList from '@/components/StudentsList.vue';
import SingleStudent from '@/components/SingleStudent.vue';

// Za testiranje
let idx = 0;

@Options({
	components: {
		StudentsList, CreateStudent, SingleStudent
	}
})
export default class App extends Vue {
	students: IStudent[] = [];
	studentsStatuses: IStudentStatus[] = [];
	selectedStudent: IStudent | null = null;

	onStudentCreate(sIndex: number, sName: string, sLastName: string, sAge: number, sStatus: string) {
		const student: IStudent = {
			StudentId: idx ++,
			brIndeksa: sIndex,
			Ime: sName,
			Prezime: sLastName,
			Godina: sAge
		}

		this.axios.post('/createstudent', student).then(
			(response) => {
				// uspesno kreiran
				if (response.status == 202) {
					this.students.push(student);
				}
			}
		).catch(
			e => console.log(e)
		);
	}

	onStudentSelected(student: IStudent | null) {
		this.selectedStudent = student;
	}
	
	onStudentDeleted(student: IStudent) {
		if (!student) {
			return;
		}

		this.axios.post(`/delete-student-ruta/${student.StudentId}`).then(
			(response) => {
				// ako je uspesan status
				if (response.status == 202) {
					const index = this.students.indexOf(student);

					if (index != -1) {
						this.students.splice(index, 1);
						this.selectedStudent = null;
					}
				}
			}
		)


	}
	
	mounted() {
		this.axios.get('/').then((
			(response) => {
				if (response.data != undefined) {
					this.students = response.data;
				}
			}
		)).catch(
			e => console.log(e)
		);
	}
}
</script>

<style lang="scss">
body {
	margin: 0;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	display: grid;

	#wrapper {
		max-width: 1170px;
		width: 100%;
		margin: 0 auto;
		height: auto;
		padding: 50px 0;
	}

	#header {
		h2 { margin: 0; }
	}

	input[type=text] {
		padding: 10px;
		border-radius: 5px;
		border: 1px solid grey;
		
		&:focus { 
			outline: none;
		}
	}

	button {
		padding: 10px 15px;
      font-size: 12pt;
      transition: all .25s ease;
      cursor: pointer;
      border-radius: 5px;
		border: none;

		&:hover {
			opacity: 0.6;
			transform: translateY(-1px);
		}
	}
}

@media only screen and (max-width: 600px) {
	#app {
		#wrapper {
			width: 100%;
		}
	}
}

</style>
